import * as mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';

import { AnyObject } from '../generic';


/**
 * @interface MongoDBAggregationArithmeticOperators
 *
 * @description
 * Arithmetic expressions perform mathematics operations on numbers.
 * Some arithmetic expressions can also support date arithmetic.
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#arithmetic-expression-operators
 */
interface MongoDBAggregationArithmeticOperators {
  /**
   * Returns the absolute value of a number.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/abs/#exp._S_abs
   */
  $abs?: number;

  /**
   * Adds numbers to return the sum, or adds numbers and a date to return a new date.
   * If adding numbers and a date, treats the numbers as milliseconds.
   * Accepts any number of argument expressions, but at most, one expression can resolve to a date.
   */
  $add?: any;

  /** Returns the smallest integer greater than or equal to the specified number. */
  $ceil?: any;

  /**
   * Returns the result of dividing the first number by the second.
   * Accepts two argument expressions.
   */
  $divide?: any;

  /** Raises e to the specified exponent. */
  $exp?: any;

  /** Returns the largest integer less than or equal to the specified number. */
  $floor?: any;

  /** Calculates the natural log of a number. */
  $ln?: any;

  /** Calculates the log of a number in the specified base. */
  $log?: any;

  /** Calculates the log base 10 of a number. */
  $log10?: any;

  /**
   * Returns the remainder of the first number divided by the second.
   * Accepts two argument expressions.
   */
  $mod?: any;

  /** Multiplies numbers to return the product. Accepts any number of argument expressions. */
  $multiply?: any;

  /** Raises a number to the specified exponent. */
  $pow?: any;

  /** Rounds a number to to a whole integer or to a specified decimal place. */
  $round?: any;

  /** Calculates the square root. */
  $sqrt?: any;

  /**
   * Returns the result of subtracting the second value from the first.
   * If the two values are numbers, return the difference.
   * If the two values are dates, return the difference in milliseconds.
   * If the two values are a date and a number in milliseconds, return the resulting date.
   * Accepts two argument expressions.
   * If the two values are a date and a number, specify the date argument
   * first as it is not meaningful to subtract a date from a number.
   */
  $subtract?: any;

  /** Truncates a number to a whole integer or to a specified decimal place. */
  $trunc?: any;
}


/**
 * @interface MongoDBAggregationArrayOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#array-expression-operators
 */
interface MongoDBAggregationArrayOperators {
  /** Returns the element at the specified array index. */
  $arrayElemAt?: any;

  /** Converts an array of key value pairs to a document. */
  $arrayToObject?: any;

  /** Concatenates arrays to return the concatenated array. */
  $concatArrays?: any;

  /** Selects a subset of the array to return an array with only the elements that match the filter condition. */
  $filter?: any;

  /** Returns the first array element. Distinct from $first accumulator. */
  $first?: any;

  /** Returns a boolean indicating whether a specified value is in an array. */
  $in?: any;

  /**
   * Searches an array for an occurrence of a specified value
   * and returns the array index of the first occurrence.
   * If the substring is not found, returns -1.
   */
  $indexOfArray?: any;

  /** Determines if the operand is an array. Returns a boolean. */
  $isArray?: any;

  /** Returns the last array element. Distinct from $last accumulator. */
  $last?: any;

  /**
   * Applies a subexpression to each element of an array
   * and returns the array of resulting values in order. Accepts named parameters.
   */
  $map?: any;

  /** Converts a document to an array of documents representing key-value pairs. */
  $objectToArray?: any;

  /** Outputs an array containing a sequence of integers according to user-defined inputs. */
  $range?: any;

  /** Applies an expression to each element in an array and combines them into a single value. */
  $reduce?: any;

  /** Returns an array with the elements in reverse order. */
  $reverseArray?: any;

  /** Returns the number of elements in the array. Accepts a single expression as argument. */
  $size?: any;

  /** Returns a subset of an array. */
  $slice?: any;

  /** Merge two arrays together. */
  $zip?: any;
}


/**
 * @interface MongoDBAggregationBooleanOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#boolean-expression-operators
 */
interface MongoDBAggregationBooleanOperators {
  /**
   * Returns true only when all its expressions evaluate to true.
   * Accepts any number of argument expressions.
   */
  $and?: (string | number | boolean | null | MongoDBAggregationComparisonOperators)[];


  /**
   * Returns the boolean value that is the opposite of its argument expression.
   * Accepts a single argument expression.
   */
  $not?: (string | number | boolean | null | MongoDBAggregationComparisonOperators)[];


  /**
   * Returns true when any of its expressions evaluates to true.
   * Accepts any number of argument expressions.
   */
  $or?: (string | number | boolean | null | MongoDBAggregationComparisonOperators)[];
}


/**
 * @interface MongoDBAggregationComparisonOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#comparison-expression-operators
 */
interface MongoDBAggregationComparisonOperators<Reference =
  [ string | number | MongoDBAggregationExpressions, string | number | MongoDBAggregationExpressions ]> {
  /** Returns true if the values are equivalent. */
  $eq?: Reference;

  /** Returns true if the first value is greater than the second. */
  $gt?: Reference;

  /** Returns true if the first value is greater than or equal to the second. */
  $gte?: Reference;

  /** Returns true if the first value is less than the second. */
  $lt?: Reference;

  /** Returns true if the first value is less than or equal to the second. */
  $lte?: Reference;

  /** Returns true if the values are not equivalent. */
  $ne?: Reference;
}


/**
 * @interface MongoDBAggregationConditionalOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#conditional-expression-operators
 */
interface MongoDBAggregationConditionalOperators {
  /**
   * Evaluates a boolean expression to return
   * one of the two specified return expressions.
   */
  $cond?: {
    /** Boolean expression to evaluate */
    if: MongoDBAggregationComparisonOperators | MongoDBAggregationBooleanOperators;

    /** Result if expression is true */
    then: string | number | boolean | null;

    /** Result if expression is false */
    else: string | number | boolean | null;
  } | [
      MongoDBAggregationComparisonOperators | MongoDBAggregationBooleanOperators,
      string | number | boolean | null,
      string | number | boolean | null
  ];

  /**
   * Returns either the non-null result of the first expression
   * or the result of the second expression if the first expression results in a null result.
   * Null result encompasses instances of undefined values or missing fields.
   * Accepts two expressions as arguments.
   * The result of the second expression can be null.
   */
  $ifNull?: any;
}


/**
 * @interface MongoDBAggregationCustomOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#custom-aggregation-expression-operators
 */
interface MongoDBAggregationCustomOperators {

}


/**
 * @interface MongoDBAggregationDataSizeOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#data-size-expression-operators
 */
interface MongoDBAggregationDataSizeOperators {

}


/**
 * @interface MongoDBAggregationDateOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#date-expression-operators
 */
interface MongoDBAggregationDateOperators {

}


/**
 * @interface MongoDBAggregationLiteralOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#literal-expression-operator
 */
interface MongoDBAggregationLiteralOperators {

}


/**
 * @interface MongoDBAggregationObjectOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#object-expression-operators
 */
interface MongoDBAggregationObjectOperators {

}


/**
 * @interface MongoDBAggregationSetOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#set-expression-operators
 */
interface MongoDBAggregationSetOperators {

}


/**
 * @interface MongoDBAggregationStringOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#string-expression-operators
 */
interface MongoDBAggregationStringOperators {
  /** Concatenates any number of strings. */
  $concat?: any;

  /** Converts a date/time string to a date object. */
  $dateFromString?: any;

  /** Returns the date as a formatted string. */
  $dateToString?: any;

  /**
   * Searches a string for an occurrence of a substring
   * and returns the UTF-8 byte index of the first occurrence.
   * If the substring is not found, returns -1.
   */
  $indexOfBytes?: any;

  /**
   * Searches a string for an occurrence of a substring
   * and returns the UTF-8 code point index of the first occurrence.
   * If the substring is not found, returns -1
   */
  $indexOfCP?: any;

  /** Removes whitespace or the specified characters from the beginning of a string. */
  $ltrim?: any;

  /**
   * Applies a regular expression (regex) to a string
   * and returns information on the first matched substring.
   */
  $regexFind?: any;

  /**
   * Applies a regular expression (regex) to a string
   * and returns information on the all matched substrings
   */
  $regexFindAll?: any;

  /**
   * Applies a regular expression (regex) to a string
   * and returns a boolean that indicates if a match is found or not.
   */
  $regexMatch?: any;

  /**
   * Replaces the first instance of a matched string in a given input.
   */
  $replaceOne?: any;

  /** Replaces all instances of a matched string in a given input. */
  $replaceAll?: any;

  /** Removes whitespace or the specified characters from the end of a string. */
  $rtrim?: any;

  /**
   * Splits a string into substrings based on a delimiter.
   * Returns an array of substrings.
   * If the delimiter is not found within the string,
   * returns an array containing the original string.
   */
  $split?: any;

  /** Returns the number of UTF-8 encoded bytes in a string. */
  $strLenBytes?: any;

  /** Returns the number of UTF-8 code points in a string. */
  $strLenCP?: any;

  /**
   * Performs case-insensitive string comparison and returns:
   * 0 if two strings are equivalent,
   * 1 if the first string is greater than the second,
   * and -1 if the first string is less than the second.
   */
  $strcasecmp?: any;

  /**
   * Returns the substring of a string.
   * Starts with the character at the specified UTF-8 byte index (zero-based)
   * in the string and continues for the specified number of bytes.
   */
  $substrBytes?: any;

  /**
   * Returns the substring of a string.
   * Starts with the character at the specified UTF-8
   * code point (CP) index (zero-based) in the string
   * and continues for the number of code points specified.
   */
  $substrCP?: any;

  /** Converts a string to lowercase. Accepts a single argument expression. */
  $toLower?: any;

  /** Converts value to a string. */
  $toString?: any;

  /**
   * Removes whitespace or the specified characters
   * from the beginning and end of a string.
   */
  $trim?: any;

  /** Converts a string to uppercase. Accepts a single argument expression. */
  $toUpper?: any;
}


/**
 * @interface MongoDBAggregationTextOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#text-expression-operator
 */
interface MongoDBAggregationTextOperators {

}


/**
 * @interface MongoDBAggregationTrigonometryOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#trigonometry-expression-operators
 */
interface MongoDBAggregationTrigonometryOperators {

}


/**
 * @interface MongoDBAggregationTypeOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#type-expression-operators
 */
interface MongoDBAggregationTypeOperators {

}


/**
 * @interface MongoDBAggregationGroupAccumulatorsOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#accumulators-group
 */
interface MongoDBAggregationGroupAccumulatorsOperators {

}


/**
 * @interface MongoDBAggregationAccumulatorsOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#accumulators-in-other-stages
 */
interface MongoDBAggregationAccumulatorsOperators {
  /** Returns the result of a user-defined accumulator function. */
  $accumulator?: any;

  /**
   * Returns an array of unique expression values for each group.
   * Order of the array elements is undefined.
   */
  $addToSet?: any;

  /** Returns an average of numerical values. Ignores non-numeric values. */
  $avg?: any;

  /**
   * Returns a value from the first document for each group.
   * Order is only defined if the documents are in a defined order.
   * Distinct from the $first array operator.
   */
  $first?: any;

  /**
   * Returns a value from the last document for each group.
   * Order is only defined if the documents are in a defined order.
   * Distinct from the $last array operator.
   */
  $last?: any;

  /** Returns the highest expression value for each group. */
  $max?: any;

  /** Returns a document created by combining the input documents for each group. */
  $mergeObjects?: any;

  /** Returns the lowest expression value for each group. */
  $min?: any;

  /** Returns an array of expression values for each group. */
  $push?: any;

  /** Returns the population standard deviation of the input values. */
  $stdDevPop?: any;

  /** Returns the sample standard deviation of the input values. */
  $stdDevSamp?: any;

  /** Returns a sum of numerical values. Ignores non-numeric values. */
  $sum?: any;
}


/**
 * @interface MongoDBAggregationVariableOperators
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#variable-expression-operators
 */
interface MongoDBAggregationVariableOperators {

}


/**
 * @type MongoDBAggregationExpressions
 *
 * @description
 * Set of expression that could be used in
 * aggregation pipeline
 *
 * @see https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions
 */
type MongoDBAggregationExpressions =
  string
  | Partial<MongoDBAggregationArithmeticOperators
  & MongoDBAggregationArrayOperators
  & MongoDBAggregationBooleanOperators
  & MongoDBAggregationComparisonOperators
  & MongoDBAggregationConditionalOperators
  & MongoDBAggregationCustomOperators
  & MongoDBAggregationDataSizeOperators
  & MongoDBAggregationDateOperators
  & MongoDBAggregationLiteralOperators
  & MongoDBAggregationObjectOperators
  & MongoDBAggregationSetOperators
  & MongoDBAggregationStringOperators
  & MongoDBAggregationTextOperators
  & MongoDBAggregationTrigonometryOperators
  & MongoDBAggregationTypeOperators
  & MongoDBAggregationGroupAccumulatorsOperators
  & MongoDBAggregationAccumulatorsOperators
  & MongoDBAggregationVariableOperators>;

type MongoDBAccumulatorExpressions =
  string
  | Partial<MongoDBAggregationAccumulatorsOperators & MongoDBAggregationGroupAccumulatorsOperators>;


/**
 * @interface MongoDBAggregationDefinition
 *
 * @description
 * All MongoDB Aggregation Pipeline Stages
 * Stages are the upper level of the aggregation pipeline
 * array and are used to get document from db
 *
 * @see https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/
 */
interface MongoDBAggregationStages<Results extends AnyObject = AnyObject> {


  /**
   * Adds new fields to documents.
   * $addFields outputs documents that contain all existing fields
   * from the input documents and newly added fields.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields
   */
  $addFields: Record<keyof Results | string, MongoDBAggregationExpressions>


  /**
   * Categorizes incoming documents into groups, called buckets,
   * based on a specified expression and bucket boundaries and outputs a document per each bucket.
   * Each output document contains an _id field whose value specifies the inclusive lower bound of the bucket.
   * The output option specifies the fields included in each output document.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/
   *
   * @example
   * {
   *   $bucket: {
   *     groupBy: "$year_born",                        // Field to group by
   *     boundaries: [ 1840, 1850, 1860, 1870, 1880 ], // Boundaries for the buckets
   *     default: "Other",                             // Bucket id for documents which do not fall into a bucket
   *     output: {                                     // Output for each bucket
   *       "count": { $sum: 1 },
   *       "artists" : {
   *         $push: {
   *           "name": { $concat: [ "$first_name", " ", "$last_name"] },
   *           "year_born": "$year_born"
   *         }
   *       }
   *     }
   *   }
   * }
   */
  $bucket: {
    /**
     * An expression to group documents by.
     * To specify a field path, prefix the field name with a dollar sign $ and enclose it in quotes.
     */
    groupBy: MongoDBAggregationExpressions;

    /**
     * An array of values based on the groupBy expression that specify the boundaries for each bucket.
     * Each adjacent pair of values acts as the inclusive lower boundary
     * and the exclusive upper boundary for the bucket. You must specify at least two boundaries.
     * The specified values must be in ascending order and all of the same type.
     *
     * @example
     * [ 0, 5, 10 ]
     *
     * An array of [ 0, 5, 10 ] creates two buckets:
     * [0, 5) with inclusive lower bound 0 and exclusive upper bound 5.
     * [5, 10) with inclusive lower bound 5 and exclusive upper bound 10.
     */
    boundaries: number[];

    /**
     * Optional.
     * A literal that specifies the _id of an additional bucket that contains all documents
     * whose groupBy expression result does not fall into a bucket specified by boundaries.
     *
     * If unspecified, each input document must resolve the groupBy expression
     * to a value within one of the bucket ranges specified by boundaries or the operation throws an error.
     *
     * The default value must be less than the lowest boundaries value,
     * or greater than or equal to the highest boundaries value.
     *
     * The default value can be of a different type than the entries in boundaries.
     */
    default?: number;

    /**
     * Optional.
     * A document that specifies the fields to include in the output documents
     * in addition to the _id field. To specify the field to include, you must use accumulator expressions.
     *
     * If you do not specify an output document, the operation returns a count
     * field containing the number of documents in each bucket.
     *
     * If you specify an output document, only the fields specified in the document are returned;
     * i.e. the count field is not returned unless it is explicitly included in the output document.
     */
    output?: Record<keyof Results | string, MongoDBAccumulatorExpressions>
  }


  /**
   * Passes a document to the next stage that
   * contains a count of the number of documents input to the stage.
   *
   * <string> is the name of the output field which has the count as its value.
   * <string> must be a non-empty string, must not start with $ and must not contain the . character.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/count/
   *
   * @example
   * db.scores.aggregate([
   *   { $match: { score: { $gt: 80 } } },
   *   { $count: "passing_scores" }
   * ])
   *
   * // Returns
   * { "passing_scores" : 4 }
   */
  $count: string;


  /**
   * Processes multiple aggregation pipelines within a single stage on the same set of input documents.
   * Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.
   *
   * The $facet stage allows you to create multi-faceted aggregations which characterize data across multiple dimensions,
   * or facets, within a single aggregation stage.
   * Multi-faceted aggregations provide multiple filters and categorizations to guide data browsing and analysis.
   * Retailers commonly use faceting to narrow search results by creating filters on product price, manufacturer, size, etc.
   *
   * Input documents are passed to the $facet stage only once.
   * $facet enables various aggregations on the same set of input documents,
   * without needing to retrieve the input documents multiple times.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/facet/
   *
   * @example
   * { $facet:
   *   {
   *     <outputField1>: [ <stage1>, <stage2>, ... ],
   *     <outputField2>: [ <stage1>, <stage2>, ... ]
   *   }
   * }
   */
  $facet: Record<keyof Results | string, MongoDBAggregationPipeline>;


  /**
   * Outputs documents in order of nearest to farthest from a specified point.
   *
   * When using $geoNear, consider that:
   *  - You can only use $geoNear as the first stage of a pipeline.
   *  - You must include the distanceField option.
   *    The distanceField option specifies the field that will contain the calculated distance.
   *  - $geoNear requires a geospatial index.
   *  - If you have more than one geospatial index on the collection,
   *    use the keys parameter to specify which field to use in the calculation.
   *    If you have only one geospatial index, $geoNear implicitly uses the indexed field for the calculation.
   *  - You cannot specify a $near predicate in the query field of the $geoNear stage.
   *  - Views do not support geoNear operations (i.e. $geoNear pipeline stage).
   *  - Starting in version 4.2, $geoNear no longer has a default limit of 100 documents.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/
   *
   * @example
   * {
   *   $geoNear: {
   *     near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] },
   *     distanceField: "dist.calculated",
   *     maxDistance: 2,
   *     query: { category: "Parks" },
   *     includeLocs: "dist.location",
   *     spherical: true
   *   }
   * }
   *
   * The matching document contains two new fields:
   *  - dist.calculated field that contains the calculated distance, and
   *  - dist.location field that contains the location used in the calculation.
   */
  $geoNear: {
    /**
     * The point for which to find the closest documents.
     * If using a 2d sphere index, you can specify the point as either a GeoJSON point or legacy coordinate pair.
     * If using a 2d index, specify the point as a legacy coordinate pair.
     */
    near: { type: 'Point', coordinates: [ number, number ] } | [ number, number ];

    /**
     * The output field that contains the calculated distance.
     * To specify a field within an embedded document, use dot notation.
     */
    distanceField: string;

    /**
     * Optional.
     * Determines how MongoDB calculates the distance between two points:
     *  - When true, MongoDB uses $nearSphere semantics and calculates distances using spherical geometry.
     *  - When false, MongoDB uses $near semantics: spherical geometry for 2dsphere indexes and planar geometry for 2d indexes.
     *  Default: false.
     */
    spherical?: boolean;

    /**
     * Optional.
     * The maximum distance from the center point that the documents can be.
     * MongoDB limits the results to those documents that fall within the specified distance from the center point.
     *
     * Specify the distance in meters if the specified point is GeoJSON
     * and in radians if the specified point is legacy coordinate pairs.
     */
    maxDistance?: number;

    /**
     * Optional.
     * Limits the results to the documents that match the query.
     * The query syntax is the usual MongoDB read operation query syntax.
     *
     * You cannot specify a $near predicate in the query field of the $geoNear stage.
     */
    query?: FilterQuery<AnyObject>;

    /**
     * Optional.
     * The factor to multiply all distances returned by the query.
     * For example, use the distanceMultiplier to convert radians, as returned by a spherical query,
     * to kilometers by multiplying by the radius of the Earth.
     */
    distanceMultiplier?: number;

    /**
     * Optional.
     * This specifies the output field that identifies the location used to calculate the distance.
     * This option is useful when a location field contains multiple locations.
     * To specify a field within an embedded document, use dot notation.
     */
    includeLocs?: string;

    /**
     * Optional.
     * If this value is true, the query returns a matching document once,
     * even if more than one of the document’s location fields match the query.
     *
     * Deprecated since version 2.6: Geospatial queries no longer return duplicate results.
     * The $uniqueDocs operator has no impact on results.
     * @deprecated
     */
    uniqueDocs?: boolean;

    /**
     * Optional.
     * The minimum distance from the center point that the documents can be.
     * MongoDB limits the results to those documents that fall outside the specified distance from the center point.
     * Specify the distance in meters for GeoJSON data and in radians for legacy coordinate pairs.
     * New in version 3.2.
     */
    minDistance?: number;

    /**
     * Optional.
     * Specify the geospatial indexed field to use when calculating the distance.
     */
    key?: any;
  };


  /**
   * Groups input documents by the specified _id expression and for each distinct grouping, outputs a document.
   * The _id field of each output document contains the unique group by value.
   * The output documents can also contain computed fields that hold the values of some accumulator expression.
   *
   * @example
   * $group : {
   *   _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
   *   totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
   *   averageQuantity: { $avg: "$quantity" },
   *   count: { $sum: 1 }
   * }
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/group/
   */
  $group: {
    /**
     * If you specify an _id value of null, or any other constant value,
     * the $group stage calculates accumulated values for all the input documents as a whole.
     * See example of Group by Null.
     *
     * @see https://docs.mongodb.com/manual/reference/operator/aggregation/group/#null-example
     */
    _id: MongoDBAggregationExpressions;

    /**
     * Optional.
     * Computed using the accumulator operators.
     *
     * @see https://docs.mongodb.com/manual/reference/operator/aggregation/group/#accumulators-group
     */
    fields?: Record<keyof Results, MongoDBAccumulatorExpressions>
  }


  /**
   * Limits the number of documents passed to the next stage in the pipeline.
   * $limit takes a positive integer that specifies the maximum number of documents to pass along.
   *
   * When a $sort precedes a $limit and there are no intervening stages that modify the number of documents,
   * the optimizer can coalesce the $limit into the $sort. This allows the $sort operation to only maintain
   * the top n results as it progresses, where n is the specified limit, and ensures that MongoDB
   * only needs to store n items in memory.
   * This optimization still applies when allowDiskUse is true and the n items exceed the aggregation memory limit.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/limit/
   */
  $limit: number;


  /**
   * Performs a left outer join to an unsharded collection in the same database
   * to filter in documents from the “joined” collection for processing.
   * To each input document, the $lookup stage adds a new array field whose elements
   * are the matching documents from the “joined” collection.
   * The $lookup stage passes these reshaped documents to the next stage.
   *
   * @example
   * // Equality Match
   * $lookup:
   * {
   *   from: <collection to join>,
   *   localField: <field from the input documents>,
   *   foreignField: <field from the documents of the "from" collection>,
   *   as: <output array field>
   * }
   *
   * // Conditions and Uncorrelated SubQueries
   * $lookup:
   * {
   *   from: <collection to join>,
   *   let: { <var_1>: <expression>, …, <var_n>: <expression> },
   *   pipeline: [ <pipeline to execute on the collection to join> ],
   *   as: <output array field>
   * }
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
   */
  $lookup: {
    /**
     * Specifies the collection in the same database to perform the join with.
     * The from collection cannot be sharded.
     */
    from: string,

    /**
     * Specifies the name of the new array field to add to the input documents.
     * The new array field contains the matching documents from the from collection.
     * If the specified name already exists in the input document, the existing field is overwritten.
     */
    as: string
  } & ({
    /**
     * Specifies the field from the documents input to the $lookup stage.
     * $lookup performs an equality match on the localField to the foreignField
     * from the documents of the from collection.
     * If an input document does not contain the localField,
     * the $lookup treats the field as having a value of null for matching purposes.
     */
    localField: string,

    /**
     * Specifies the field from the documents in the from collection.
     * $lookup performs an equality match on the foreignField to the localField from the input documents.
     * If a document in the from collection does not contain the foreignField,
     * the $lookup treats the value as null for matching purposes.
     */
    foreignField: string,
  } | {
    /**
     * Optional. Specifies variables to use in the pipeline field stages.
     * Use the variable expressions to access the fields from the documents input to the $lookup stage.
     * The pipeline cannot directly access the input document fields.
     * Instead, first define the variables for the input document fields,
     * and then reference the variables in the stages in the pipeline.
     *
     * To reference variables in pipeline stages, use the "$$<variable>" syntax.
     */
    let: Record<string, string>;

    /**
     * Specifies the pipeline to run on the joined collection.
     * The pipeline determines the resulting documents from the joined collection.
     * To return all documents, specify an empty pipeline [].
     *
     * The pipeline cannot include the $out stage or the $merge stage.
     *
     * The pipeline cannot directly access the input document fields.
     * Instead, first define the variables for the input document fields,
     * and then reference the variables in the stages in the pipeline.
     */
    pipeline: MongoDBAggregationPipeline;
  });


  /**
   * Filters the documents to pass only the documents
   * that match the specified condition(s) to the next pipeline stage.
   * $match takes a document that specifies the query conditions.
   * The query syntax is identical to the read operation query syntax;
   * i.e. $match does not accept raw aggregation expressions.
   * Instead, use a $expr query expression to include aggregation expression in $match.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/match/
   */
  $match: Partial<MongoDBAggregationBooleanOperators>
    | { $expr?: Partial<MongoDBAggregationComparisonOperators> }
    | {
    [key: string]:
      | string
      | number
      | boolean
      | RegExp
      | mongoose.Types.ObjectId
      | Partial<MongoDBAggregationComparisonOperators<number>>
  };


  /**
   * Passes along the documents with the requested fields to the next stage in the pipeline.
   * The specified fields can be existing fields from the input documents or newly computed fields.
   * The $project takes a document that can specify the inclusion of fields,
   * the suppression of the _id field, the addition of new fields,
   * and the resetting of the values of existing fields.
   * Alternatively, you may specify the exclusion of fields.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/project/
   */
  $project: {
    /** Specify ID Suppression. ID is Always selected */
    _id?: 0 | false;

    /** Specify any other field projection */
    [key: string]: 0 | 1 | boolean | Partial<MongoDBAggregationExpressions>
  }


  /**
   * Sorts all input documents and returns them to the pipeline in sorted order.
   *
   * @see https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
   */
  $sort: Record<string, 1 | -1 | { $meta: 'textScore' }>
}

type MongoDBAggregationCommand = keyof MongoDBAggregationStages;


/**
 * @type MongoDBAggregationInstruction
 *
 * @description
 * A single MongoDB Aggregation Instruction
 */
export type MongoDBAggregationInstruction<Results extends AnyObject = AnyObject,
  K extends MongoDBAggregationCommand = MongoDBAggregationCommand> = Partial<{
  [KK in K]: MongoDBAggregationStages<Results>[KK]
}>;


export type MongoDBAggregationPipeline<Results extends AnyObject = AnyObject> = MongoDBAggregationInstruction<Results>[];
