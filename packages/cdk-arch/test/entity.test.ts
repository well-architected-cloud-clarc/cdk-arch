import { Architecture, Entity, Function, external } from '../src';

describe('Entity', () => {
  const arch = new Architecture('entity-test');
  const handler = new Function(arch, 'hello', async () => 'hi');

  it('keeps its kind', () => {
    expect(new Entity(external, 'a-person', 'person').kind).toBe('person');
    expect(new Entity(external, 'a-system', 'system').kind).toBe('system');
  });

  it('is external when scoped under `external`', () => {
    expect(new Entity(external, 'outsider', 'person').isExternal).toBe(true);
  });

  it('is internal when scoped under a regular architecture', () => {
    expect(new Entity(arch, 'insider', 'person').isExternal).toBe(false);
  });

  it('records what it uses, with optional labels', () => {
    const user = new Entity(external, 'user', 'person')
      .uses(handler, 'says hello')
      .uses(arch);
    expect(user.usages).toEqual([
      { target: handler, label: 'says hello' },
      { target: arch, label: undefined },
    ]);
  });

  it('does not make `external` a child of anything', () => {
    expect(external.node.scope).toBeUndefined();
  });
});
