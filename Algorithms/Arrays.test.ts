import * as fc from 'fast-check';
import {
    smallestMidpoint,
    biggestMidpoint,
    lowerBound,
    upperBound,
    binarySearch,
    indexOfSmallest,
    indexOfBiggest,
    smallestElement,
    biggestElement,
    shiftIndex,
    parentNodeIndex,
    leftNodeIndex,
    rightNodeIndex,
    merge,
    copy
} from './Arrays';
import { ascending, compare } from '../Common';
import { randomInt } from './Common';
import { dictionary } from './Dictionaries';

describe('smallestMidpoint()', () => {
    it('must be 50 the middle element between 1 and 100', () => {
        let mid = smallestMidpoint(1, 100);
        expect(mid).toBe(50);
    });

    it('must be 50 the middle element between 0 and 100', () => {
        let mid = smallestMidpoint(1, 100);
        expect(mid).toBe(50); // floor(100 - 1) + 1
    });

    it('must be 5 the middle element between 0 and 10', () => {
        let mid = smallestMidpoint(0, 10);
        expect(mid).toBe(5);
    });

    it('must be 4 the middle element between -2 and 10', () => {
        let mid = smallestMidpoint(-2, 10);
        expect(mid).toBe(4);
    });

    it('must be an element no bigger than the middle', () => {
        fc.assert(fc.property(fc.integer(), fc.integer(), (x, y) => {
            let begin = Math.min(x, y);
            let end = Math.max(x, y);
            let mid = smallestMidpoint(begin, end);
            let result = Math.floor((end - begin) / 2) + begin;
            expect(mid).toBe(result);
        }));
    });
});

describe('biggestMidpoint()', () => {
    it('must be 51 the middle element between 1 and 100', () => {
        let mid = biggestMidpoint(1, 100);
        expect(mid).toBe(51); // ceil(100 - 1) + 1
    });

    it('must be 50 the middle element between 0 and 100', () => {
        let mid = biggestMidpoint(0, 100);
        expect(mid).toBe(50);
    });

    it('must be 5 the middle element between 0 and 10', () => {
        let mid = biggestMidpoint(0, 10);
        expect(mid).toBe(5);
    });

    it('must be 4 the middle element between -2 and 10', () => {
        let mid = biggestMidpoint(-2, 10);
        expect(mid).toBe(4);
    });

    it('must be an element equal to middle or middle + 1', () => {
        fc.assert(fc.property(fc.integer(), fc.integer(), (x, y) => {
            let begin = Math.min(x, y);
            let end = Math.max(x, y);
            let mid = biggestMidpoint(begin, end);
            let result = Math.ceil((end - begin) / 2) + begin;            
            expect(mid).toBe(result);
        }));
    });
});

describe('lowerBound()', () => {
    it('must find a element x presented in the array in its exactly position', () => {
        fc.assert(fc.property(fc.uniqueArray(fc.integer()), (arr => {
            const sorted =  arr.sort(ascending);
            let index = randomInt(0, Math.max(0, sorted.length - 1));
            let returned = lowerBound(sorted, sorted[index], ascending);
            expect(returned).toBe(index);
        })));
    });
});

describe('upperBound()', () => {
    it('must find a element x (presented in the array) bigger than y (presented in the array) presented in the array in x_index + 1 (except when array is empty, then it is x_index)', () => {
        fc.assert(fc.property(fc.uniqueArray(fc.integer()), (arr => {
            const sorted =  arr.sort(ascending);
            let index = randomInt(0, Math.max(0, sorted.length - 1));
            let returned = upperBound(sorted, sorted[index], ascending);

            if (sorted.length == 0) {
                expect(returned).toBe(0);
            } else {
                expect(returned).toBe(index + 1);
            }
        })));
    });
});

describe('binarySearch()', () => {
    it('must find a element x presented in the array', () => {
        fc.assert(fc.property(fc.uniqueArray(fc.integer()), (arr => {
            const sorted =  arr.sort(ascending);
            if (arr.length > 0) {
                let index = randomInt(0, Math.max(0, sorted.length - 1));
                expect(binarySearch(sorted, sorted[index], ascending)).toBe(true);
            }            
        })));
    });

    it('must not find a element x in the array', () => {
        fc.assert(fc.property(fc.uniqueArray(fc.integer()), (arr => {
            const sorted =  arr.sort(ascending);
            
            var existing_keys = dictionary(sorted, e => e);
            let value = randomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

            while (existing_keys[value] !== undefined) {
                value = randomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            }

            expect(binarySearch(sorted, value, ascending)).toBe(false);
        })));
    });
});

describe('indexOfSmallest()', () => {
    it('must return the index of the smallest element of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let minIndex = indexOfSmallest(arr, compare);

            let value;

            if (minIndex != -1) {
                value = arr[minIndex];
            }

            let isSmallest = true;

            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (compare(value, element) > 0) {
                    isSmallest = false;
                }
            }
            
            expect(isSmallest).toBe(true);
        }));
    });
});

describe('smallestElement()', () => {
    it('must return the smallest element of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let smallest = smallestElement(arr, compare);

            let isSmallest = true;

            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (compare(smallest, element) > 0) {
                    isSmallest = false;
                }
            }
            
            expect(isSmallest).toBe(true);
        }));
    });
});

describe('indexOfBiggest()', () => {
    it('must return the index of the biggest element of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let minIndex = indexOfBiggest(arr, compare);

            let value;

            if (minIndex != -1) {
                value = arr[minIndex];
            }

            let isBiggest = true;

            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (compare(value, element) > 0) {
                    isBiggest = false;
                }
            }
            
            expect(isBiggest).toBe(true);
        }));
    });
});

describe('biggestElement()', () => {
    it('must return the biggest element of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let minIndex = biggestElement(arr, compare);

            let value;

            if (minIndex != -1) {
                value = arr[minIndex];
            }

            let isBiggest = true;

            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (compare(value, element) > 0) {
                    isBiggest = false;
                }
            }
            
            expect(isBiggest).toBe(true);
        }));
    });
});

describe('biggestElement()', () => {
    it('must return the biggest element of the array', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let minIndex = biggestElement(arr, compare);

            let value;

            if (minIndex != -1) {
                value = arr[minIndex];
            }

            let isBiggest = true;

            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (compare(value, element) > 0) {
                    isBiggest = false;
                }
            }
            
            expect(isBiggest).toBe(true);
        }));
    });
});

describe('shiftIndex()', () => {
    it('must shift index to left and return a valid index of arr', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {

            let size = arr.length * 3;
            let j = arr.length - 1;
            let len = arr.length;

            let validIndex = true;

            for (let i = 0; i < size; i++, j--) {
                let index = shiftIndex(j, len);

                validIndex &&= (index >= 0 && index < len) && arr[index] !== undefined;
            }
            
            expect(validIndex).toBe(true);
        }));
    });

    it('must shift index to right and return a valid index of arr', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {

            let size = arr.length * 3;
            let j = -arr.length;
            let len = arr.length;

            let validIndex = true;

            for (let i = 0; i < size; i++) {
                let index = shiftIndex(i, len);

                validIndex &&= (index >= 0 && index < len) && arr[index] !== undefined;
            }
            
            expect(validIndex).toBe(true);
        }));
    });
});

describe('parentNodeIndex()', () => {
    it('must return the index of parent node of x', () => {
        fc.assert(fc.property(fc.integer({min: 0, max: 10000}), x => {
            let parentIndex = parentNodeIndex(x);
            expect(parentIndex).toBe(Math.ceil(x/2.0) - 1); // this test seems redundant but I'll keep it anyway
            expect(parentIndex).toBeGreaterThanOrEqual(-1);
        }));
    });
});

describe('leftNodeIndex()', () => {
    it('must return the index of left node of x', () => {
        fc.assert(fc.property(fc.integer({min: 0, max: 10000}), x => {
            let leftNode = leftNodeIndex(x);
            expect(leftNode).toBe(2 * x + 1); // this test seems redundant but I'll keep it anyway
            expect(leftNode).toBeLessThanOrEqual(10000 * 2 + 1);
        }));
    });
});

describe('rightNodeIndex()', () => {
    it('must return the index of right node of x', () => {
        fc.assert(fc.property(fc.integer({min: 0, max: 10000}), x => {
            let rightNode = rightNodeIndex(x);
            expect(rightNode).toBe(2 * x + 2); // this test seems redundant but I'll keep it anyway
            expect(rightNode).toBeLessThanOrEqual(10000 * 2 + 2);
        }));
    });
});

describe('copy()', () => {
    it('must copy arr into newArray', () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            let newArray = copy(arr, 0, arr.length, [], 0);
            expect(newArray).toEqual(arr);
        }));
    });
});

describe('merge()', () => {
    it('must merge arrays of number arr1 and arr2 in ascending order', () => {
        fc.assert(fc.property(fc.array(fc.integer()), fc.array(fc.integer()), (arr1, arr2) => {
            let ordered = arr1.concat(arr2).sort(ascending);
            let newArray = merge(arr1.sort(ascending), arr2.sort(ascending), [], ascending);
            expect(newArray).toEqual(ordered);
        }));
    });
});