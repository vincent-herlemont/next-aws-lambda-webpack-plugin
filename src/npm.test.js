const NpmTest = require('./npm');

const truncated_data = `
{
  "_id": "next-aws-lambda@2.3.4",
  "_rev": "3-50a5c778d65b837b5f487f9f92600336",
  "name": "next-aws-lambda",
  "dist-tags": {
    "latest": "2.3.4"
  }
}
`;

test('get last version', async () => {
    const npm = new NpmTest("toto");
    const mockShow = jest.fn();
    NpmTest.prototype.show = mockShow;
    mockShow.mockReturnValue(Promise.resolve(JSON.parse(truncated_data)));
    const lastVersion = await npm.getLastVersion();
    expect(lastVersion).toEqual("2.3.4");
});