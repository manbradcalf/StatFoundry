// @ts-nocheck

import { fillTemplate } from './slotFiller';

describe('fillTemplate', () => {
  it('replaces single placeholder with provided value', () => {
    const template = 'Player position is {position}';
    const slots = [{ Name: 'position', Value: 'QB' }];
    const result = fillTemplate(template, slots);
    expect(result).toBe('Player position is QB');
  });

  it('replaces multiple placeholders with provided values', () => {
    const template = 'WHERE p.{property} {operator} $value';
    const slots = [
      { Name: 'property', Value: 'weight' },
      { Name: 'operator', Value: '>=' },
    ];
    const result = fillTemplate(template, slots);
    expect(result).toBe('WHERE p.weight >= $value');
  });

  it('handles repeated placeholders', () => {
    const template = 'Between {min} and {max} and again {min}';
    const slots = [
      { Name: 'min', Value: 1 },
      { Name: 'max', Value: 10 },
    ];
    const result = fillTemplate(template, slots);
    expect(result).toBe('Between 1 and 10 and again 1');
  });
});