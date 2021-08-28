const {Shop, Item} = require('../src/gilded_rose')

describe('Gilded Rose', function() {
  it('should foo', function() {
    const gildedRose = new Shop([new Item('foo', 0, 0)])
    const items = gildedRose.updateQuality()
    expect(items[0].name).toBe('foo')
  })
  // Testing Mentioned use cases.
  it('Required General test cases', () => {
    const items = [
      new Item('Normal item', 4, 6),
      new Item('Aged Brie', 2, 0),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 12, 15)
    ]
    const expectedResult = [
      new Item('Normal item', 3, 5),
      new Item('Aged Brie', 1, 1),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 11, 16)
    ]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })
  it('Normal items quality should never be below 0', () => {
    const items = [new Item('Normal item', 5, 0)]
    const expectedResult = [new Item('Normal item', 4, 0)]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })

  it('Selling date passes, quality should degrade twice as fast', () => {
    const items = [new Item('Normal item', 0, 4)]
    const expectedResult = [new Item('Normal item', -1, 2)]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })

  it('Quality of an item can never be more than 50', () => {
    const items = [new Item('Aged Brie', 5, 50)]
    const expectedResult = [new Item('Aged Brie', 4, 50)]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })

  it('Quality of an aged brie should increase by 1', () => {
    const items = [new Item('Aged Brie', 1, 0)]
    const expectedResult = [new Item('Aged Brie', 0, 1)]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })
})

// Test cases related Backstage passes
describe('Gilded Rose Backstage passes', () => {
  it('Like aged brie, increases in Quality as its SellIn value approachess', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 14, 0)]
    const expectedResult = [new Item('Backstage passes to a TAFKAL80ETC concert', 13, 1)]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })

  it('Quality increases by 2 when there are 10 days or less', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]
    const expectedResult = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 9, 2)
    ]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems).toEqual(expectedResult)
  })

  it('Quality increases by 3 when there are 5 days or less', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)]
    const expectedResult = [new Item('Backstage passes to a TAFKAL80ETC concert', 4, 3)]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })

  it('Quality drops to 0 after concert', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30)]
    const expectedResult = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)]
    const gildedRose = new Shop(items)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).toEqual(expectedResult)
  })
  it("the quality of conjured items should decrease twice as fast", () => {
    const items = [new Item("Conjured ABC Item", 15, 20)];
    const expectedResult = [new Item("Conjured ABC Item", 14, 18)];
    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems).toEqual(expectedResult);
  });
})
