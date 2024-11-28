export const mintableExportFn = `    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }`;