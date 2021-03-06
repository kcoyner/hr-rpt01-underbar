(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   *
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length) {
      return array;
    } else {
      return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  _.indexOf = function(array, target) {
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };




  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
  var result = [];
  _.each(collection,function(item) {
    if(test(item)) {
      result.push(item);
    }
  })
  return result;
  };

  // Return all elements of an array that don't pass a truth test.
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  _.reject = function(collection, test) {
    return _.filter(collection, function(item) {return !test(item);});
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArr = [];
    _.each(array, function(item) {
      if (!newArr.includes(item)) {
        newArr.push(item);
      }
    });
    return newArr;
  };


  // Return the results of applying an iterator to each element.
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  _.map = function(collection, iterator) {
  var newArr = [];
  _.each(collection,function(item){
    newArr.push(iterator(item));
  })
  return newArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  //iterator(accumulated, currentValue, )

/* Lily's solution
_.reduce = function(collection, iterator, acc) {
    acc = acc === undefined ? _.first(collection) : acc;
    return _.last(_.map(collection, function(item) {
      return acc = iterator(acc, item);
    }));
  };
*/

  _.reduce = function(collection, iterator, accum) {
    var arg = arguments;
    _.each(collection, function(item){
      if (arg.length === 2){
        accum = item;
        arg.length++;
      } else {
        accum = iterator(accum, item);
      }
    })
    return accum;
  };

  // Determine if the array or object contains a given value (using `===`).
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  // iterator(accumulated, currentValue, )
  // [2, 2, 3, 2], = 2
  // iterator is an optional argument and is called 'predicate' in original
  //   underscore _.every
  _.every = function(collection, iterator) {
    if (arguments.length > 1) {
      // we have a callback in the form of iterator
      return _.reduce(collection, function(accum, curr) {
          if(!iterator(curr)){
            return false;  // returns to _.every
          }
          return accum; // must return accum from _.reduce if not kicked out in 'if' statement
        }, true );
    } else {
      // we do not have a callback so simply test if curr is T/F
      return _.reduce(collection, function(accum, curr){
        if (curr !== true) {
          return false;
        }
        return accum;
      }, true);
    }
  };

  // _.every = function(collection,iterator){
  //   iterator = iterator || _.identity;
  //   return _.reduce(collection,function(accum,curr){
  //     if(!iterator(curr)){   // if (curr !== false)
  //       accum = false;
  //     }
  //     return accum;
  //   },true)

  // }

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;
    return !_.every(collection, function(item){
      return !iterator(item);
    });
  };



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(objs) {
    _.each(arguments, function (extendObj) {
      for (var key in extendObj) {
        objs[key] = extendObj[key];
      }
    });
    return objs;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
    // convert arguments to a real array
    // when checking values, use Boolean(value)
  _.defaults = function(objs) {
    var args = [].slice.call(arguments);
    _.each(args, function(extendObj){
      for (let key in extendObj){
        if (key in objs) {
          _.identity(objs[key]);
        } else {
          objs[key] = extendObj[key];
        }
      }
    });
    return objs;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
      // The new function always returns the originally computed result.
  _.once = function(func) {
    var alreadyCalled = false;
    var result;
    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };


  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  // _.memoize = function(func) {
  //   var cache = {};
  //   return function(){
  //     var args = Array.from(arguments).toString();
  //     if (Array.isArray(arguments[0])) {
  //       args = "[" + args + "]";
  //     }
  //     return cache[args] = (args in cache) ? cache[args] : func.apply(null, arguments);
  //   };
  // };

  _.memoize = function(func) {
    var cache = {};
    return function(){
      var arg = JSON.stringify(arguments);
      if(cache[arg] === undefined){
        return cache[arg] = func.apply(this, arguments);
      } else {
        return cache[arg];
      }
    }
  }


/*
demonstratoin of this.

*/
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, waiting) {

    var args = Array.prototype.slice.call(arguments, 2); // means this --> arguments.slice(2);
    return setTimeout(function(){
      func.apply(null, args);
    }, waiting);

  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var clone = array.slice();
    _.each(clone, function(num, idx) {
      let pos = Math.floor(Math.random() * clone.length);
      let temp = num;
      clone[idx] = clone[pos];
      clone[pos] = temp;
    });
    return clone;
  };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


//   _.invoke([[5,1,7],[3,2,1]]), 'sort');
//   _.invoke('a string','another string'), 'toUpperCase');
//   [[1,5,7],[1,2,3]]

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.

  //runs the input function on each item in the array, and returns a list of results

  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(elem){
      // console.log('collection: ', collection);
      // console.log(functionOrKey);
     return (functionOrKey instanceof Function) ? functionOrKey.apply(elem, args) :
      //elem[key].apply(elem, args)
      elem[functionOrKey](args);
    });
  };

  //Kevin, we were oh so close so I have included the working line and our previous line. We overthot it, surprise.

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // input: obj and sorter
    // output: array
    var newArr = [];
    if (typeof iterator === 'string') {
      // it's a string, and we use the string to sort by
      // sort objs by that string prop name (i.e. 'length')
      // console.log('item.: ', item);
      // console.log('iterator: ', iterator);
      _.each(collection, function(item){
        // build a sort here where iterator === length (as an example)
          // console.log('item.: ', item);
      });
      newArr.push(iterator(item));
    } else {  // it's a Function, so sort by whatever is in function(item)
      // then iterator is our sorting function
      _.each(collection, function(item, key){
        // console.log('iterator: ', iterator);
        // console.log('iterator(item, key): ', iterator(item, key));
      });
      newArr.push(iterator(item));
    }
    return newArr;
  };





  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

