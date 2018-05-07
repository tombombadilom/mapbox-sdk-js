'use strict';

const tokensService = require('../tokens');
const tu = require('../../test/test-utils');

let tokens;
beforeEach(() => {
  tokens = tokensService(tu.mockClient());
});

describe('listTokens', () => {
  test('works', () => {
    tokens.listTokens();
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId',
      method: 'GET',
      params: undefined
    });
  });

  test('works with specified ownerId', () => {
    tokens.listTokens({ ownerId: 'specialguy' });
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId',
      params: { ownerId: 'specialguy' },
      method: 'GET'
    });
  });
});

describe('createToken', () => {
  test('works', () => {
    tokens.createToken();
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId',
      params: {},
      method: 'POST',
      body: { scopes: [] }
    });
  });

  test('with scopes', () => {
    tokens.createToken({ scopes: ['styles:read', 'styles:write'] });
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId',
      params: {},
      method: 'POST',
      body: { scopes: ['styles:read', 'styles:write'] }
    });
  });

  test('with all options', () => {
    tokens.createToken({
      scopes: ['styles:list'],
      ownerId: 'chickentooth',
      note: 'horseleg',
      resources: ['one', 'two']
    });
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId',
      params: { ownerId: 'chickentooth' },
      method: 'POST',
      body: {
        scopes: ['styles:list'],
        note: 'horseleg',
        resources: ['one', 'two']
      }
    });
  });
});

describe('updateToken', () => {
  test('works', () => {
    tokens.updateToken({ tokenId: 'foo' });
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId/:tokenId',
      params: { tokenId: 'foo' },
      method: 'PATCH',
      body: {}
    });
  });

  test('with scopes', () => {
    tokens.updateToken({
      tokenId: 'foo',
      scopes: ['styles:read', 'styles:write']
    });
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId/:tokenId',
      params: { tokenId: 'foo' },
      method: 'PATCH',
      body: { scopes: ['styles:read', 'styles:write'] }
    });
  });

  test('with all options', () => {
    tokens.updateToken({
      tokenId: 'foo',
      scopes: ['styles:list'],
      ownerId: 'chickentooth',
      note: 'horseleg',
      resources: ['one', 'two']
    });
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId/:tokenId',
      params: { tokenId: 'foo', ownerId: 'chickentooth' },
      method: 'PATCH',
      body: {
        scopes: ['styles:list'],
        note: 'horseleg',
        resources: ['one', 'two']
      }
    });
  });
});

describe('deleteToken', () => {
  test('works', () => {
    tokens.deleteToken({ tokenId: 'foo' });
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/tokens/v2/:ownerId/:tokenId',
      method: 'DELETE',
      params: { tokenId: 'foo' }
    });
  });
});

describe('listScopes', () => {
  test('works', () => {
    tokens.listScopes();
    expect(tu.requestConfig(tokens)).toEqual({
      path: '/scopes/v1/:ownerId',
      method: 'GET',
      params: undefined
    });
  });
});