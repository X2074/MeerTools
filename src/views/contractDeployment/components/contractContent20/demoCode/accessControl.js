export const ownableSol = `    function pause() public onlyOwner {
    _pause();
}

function unpause() public onlyOwner {
    _unpause();
}

// The following functions are overrides required by Solidity.

function _update(address from, address to, uint256 value)
    internal
    override(ERC20, ERC20Pausable)
{
    super._update(from, to, value);
}`

export const rolesSol = `    function pause() public onlyRole(PAUSER_ROLE) {
    _pause();
}

function unpause() public onlyRole(PAUSER_ROLE) {
    _unpause();
}

// The following functions are overrides required by Solidity.

function _update(address from, address to, uint256 value)
    internal
    override(ERC20, ERC20Pausable)
{
    super._update(from, to, value);
}`
export const rolesSolGrant = `{
    _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    _grantRole(PAUSER_ROLE, pauser);
}`
export const rolesSolFn = `constructor(address defaultAdmin, address pauser) `
export const managedSol = `    function pause() public restricted {
    _pause();
}

function unpause() public restricted {
    _unpause();
}

// The following functions are overrides required by Solidity.

function _update(address from, address to, uint256 value)
    internal
    override(ERC20, ERC20Pausable)
{
    super._update(from, to, value);
}
`