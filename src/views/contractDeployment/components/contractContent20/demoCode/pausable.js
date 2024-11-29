export const pause = `function pause() public onlyRole(PAUSER_ROLE) {
    _pause();
}`
export const unpause = `function unpause() public onlyRole(PAUSER_ROLE) {
    _unpause();
}`
export const update = `// The following functions are overrides required by Solidity.

function _update(address from, address to, uint256 value)
    internal
    override(ERC20Upgradeable, ERC20PausableUpgradeable, ERC20VotesUpgradeable)
{
    super._update(from, to, value);
}`