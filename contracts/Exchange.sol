pragma solidity ^0.4.4;

import "./ExchangeProtocol.sol";
import './ERC20.sol';
import './SafeMath.sol';
import './MutexUser.sol';

/// @title Ether Token Contract.
/// @author Melonport AG <team@melonport.com>
/// @notice Inspired by https://github.com/makerdao/maker-otc/blob/master/contracts/simple_market.sol
contract Exchange is ExchangeProtocol, SafeMath, MutexUser {

    // TYPES

    struct OfferInfo {
        uint sell_how_much;
        ERC20 sell_which_token;
        uint buy_how_much;
        ERC20 buy_which_token;
        address owner;
        bool active;
    }

    // FIELDS

    mapping( uint => OfferInfo ) public offers;
    uint public lastOfferId;

    // METHODS

    modifier is_past_zero(uint x) {
        assert(0 < x);
        _;
    }

    modifier ERC20_initialized(ERC20 x) {
        assert(x != ERC20(0x0));
        _;
    }

    modifier ERC20_not_equal(ERC20 x, ERC20 y) {
        assert(x != y);
        _;
    }

    modifier is_offer_active(uint id) {
        assert(isActive(id));
        _;
    }

    modifier only_offer_owner(uint id) {
        assert(msg.sender == getOwner(id));
        _;
    }

    // CONSTANT METHODS

    function getLastOfferId() constant returns (uint) { return lastOfferId; }

    function isActive(uint id) constant returns (bool active) {
        return offers[id].active;
    }

    function getOwner(uint id) constant returns (address owner) {
        return offers[id].owner;
    }

    function getOffer(uint id) constant returns (uint, ERC20, uint, ERC20) {
      var offer = offers[id];
      return (offer.sell_how_much, offer.sell_which_token,
              offer.buy_how_much, offer.buy_which_token);
    }

    // NON-CONSTANT INTERNAL METHODS

    function next_id() internal returns (uint) {
        lastOfferId++; return lastOfferId;
    }

    function trade(
        address seller, uint sell_how_much, ERC20 sell_which_token,
        address buyer,  uint buy_how_much,  ERC20 buy_which_token
    )
        internal
    {
        assert(buy_which_token.transferFrom(buyer, seller, buy_how_much));
        assert(sell_which_token.transfer(buyer, sell_how_much));
        Trade(sell_how_much, sell_which_token, buy_how_much, buy_which_token);
    }

    // NON-CONSTANT PUBLIC METHODS

    // Make a new offer. Takes funds from the caller into exchnage escrow.
    function offer(
        uint sell_how_much, ERC20 sell_which_token,
        uint buy_how_much,  ERC20 buy_which_token
    )
        exclusive
        is_past_zero(sell_how_much)
        is_past_zero(buy_how_much)
        ERC20_initialized(sell_which_token)
        ERC20_initialized(buy_which_token)
        ERC20_not_equal(sell_which_token, buy_which_token)
        returns (uint id)
    {
        OfferInfo memory info;
        info.sell_how_much = sell_how_much;
        info.sell_which_token = sell_which_token;
        info.buy_how_much = buy_how_much;
        info.buy_which_token = buy_which_token;
        info.owner = msg.sender;
        info.active = true;
        id = next_id();
        offers[id] = info;
        assert(sell_which_token.transferFrom( msg.sender, this, info.sell_how_much));
        ItemUpdate(id);
    }

    // Accept given `quantity` of an offer. Transfers funds from caller to
    // offer maker, and from market to caller.
    function buy(uint id, uint quantity)
        exclusive
        is_offer_active(id)
        returns (bool)
    {
        // read-only offer. Modify an offer by directly accessing offers[id]
        OfferInfo memory offer = offers[id];

        // inferred quantity that the buyer wishes to spend
        uint spend = safeMul(quantity, offer.buy_how_much) / offer.sell_how_much;
        if (spend > offer.buy_how_much || quantity > offer.sell_how_much) {
            // buyer wants more than is available
            return false;
        }
        if (spend == offer.buy_how_much && quantity == offer.sell_how_much) {
            // buyer wants exactly what is available
            delete offers[id];
            trade(offer.owner, quantity, offer.sell_which_token,
                msg.sender, spend, offer.buy_which_token);
            ItemUpdate(id);
            return true;
        }
        if (spend > 0 && quantity > 0) {
            // buyer wants a fraction of what is available
            offers[id].sell_how_much = safeSub(offer.sell_how_much, quantity);
            offers[id].buy_how_much = safeSub(offer.buy_how_much, spend);
            trade(offer.owner, quantity, offer.sell_which_token,
                msg.sender, spend, offer.buy_which_token);
            ItemUpdate(id);
            return true;
        }
        // buyer wants an unsatisfiable amount (less than 1 integer)
        return false;
    }

    // Cancel an offer. Refunds offer maker.
    function cancel(uint id)
        exclusive
        is_offer_active(id)
        only_offer_owner(id)
        returns (bool)
    {
        // read-only offer. Modify an offer by directly accessing offers[id]
        OfferInfo memory offer = offers[id];
        delete offers[id];
        assert(offer.sell_which_token.transfer(offer.owner, offer.sell_how_much));
        ItemUpdate(id);
        return true;
    }
}