describe('Timezone', () => {
    it('should always be Anchorage', () => {
        expect(new Date().getTimezoneOffset()).toBeGreaterThanOrEqual(480);
    });
});