class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}
const CONSTANTS = {
  AgedBrie: 'Aged Brie',
  BackstageConcert: 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras: 'Sulfuras, Hand of Ragnaros',
  Conjured: 'Conjured'
}
const getQualityForNormalItem = item => {
  const {sellIn, quality} = item;
  const isQualityBiggerThan0 = quality > 0
  const zeroDaysToSell = sellIn < 0
  if (isQualityBiggerThan0 && zeroDaysToSell) {
    return -2
  }
  if (isQualityBiggerThan0) {
    return -1
  }
  return 0
}

const getQualityForBackstage = item => {
  const {sellIn, quality} = item;
  const tenDaysOrLessToSell = sellIn <= 10
  const fiveDaysOrLessToSell = sellIn <= 5
  const zeroDaysToSell = sellIn < 0

  if (zeroDaysToSell) {
    return -quality
  } else if (fiveDaysOrLessToSell) {
    return 3
  } else if (tenDaysOrLessToSell) {
    return 2
  }
  return 1
}
const getSellinDifference = item => {
  const {name} = item;
  const isSulfuras = name == CONSTANTS.Sulfuras
  return !isSulfuras ? -1 : 0
}
const getQualityDifference = item => {
  const {name} = item;
  const isAgedBrie = name == CONSTANTS.AgedBrie
  const isBackstagePasses = name == CONSTANTS.BackstageConcert
  const isSulfuras = name == CONSTANTS.Sulfuras
  const isQualityLessThan50 = item.quality < 50
  const isConjuredItem = name.includes(CONSTANTS.Conjured) || name.includes(CONSTANTS.Conjured.toLowerCase())
  const isNormalItem = !isAgedBrie && !isBackstagePasses && !isSulfuras && !isConjuredItem

  if (isNormalItem) {
    return getQualityForNormalItem(item)
  } else if (isBackstagePasses) {
    return getQualityForBackstage(item)
  } else if (isAgedBrie && isQualityLessThan50) {
    return 1
  } else if (isConjuredItem) {
    return getQualityForNormalItem(item) * 2
  }
  return 0
}

class Shop {
  constructor(items = []) {
    this.items = items
  }
  updateQuality() {
    return this.items.map(item => {
      item.sellIn = item.sellIn + getSellinDifference(item)
      item.quality = item.quality + getQualityDifference(item)
      return item
    })
  }
}

module.exports = {
  Item,
  Shop
}