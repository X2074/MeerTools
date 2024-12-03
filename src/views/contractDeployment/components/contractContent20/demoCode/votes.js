export const BlockNumber = `// The following functions are overrides required by Solidity.

function _update(address from, address to, uint256 value)
    internal
    override(ERC20, ERC20Votes)
{
    super._update(from, to, value);
}

function nonces(address owner)
    public
    view
    override(ERC20Permit, Nonces)
    returns (uint256)
{
    return super.nonces(owner);
}`
export const Timestamp = `function clock() public view override returns (uint48) {
    return uint48(block.timestamp);
}

// solhint-disable-next-line func-name-mixedcase
function CLOCK_MODE() public pure override returns (string memory) {
    return "mode=timestamp";
}

// The following functions are overrides required by Solidity.

function _update(address from, address to, uint256 value)
    internal
    override(ERC20, ERC20Votes)
{
    super._update(from, to, value);
}

function nonces(address owner)
    public
    view
    override(ERC20Permit, Nonces)
    returns (uint256)
{
    return super.nonces(owner);
}`