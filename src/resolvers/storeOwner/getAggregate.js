const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { default: mongoose } = require("mongoose");

const { StoreOwner } = require("../../models");

const getAggregate = async (_, __, { user }) => {
  try {
    // if (!user) {
    //   throw new AuthenticationError("Unauthorised to perform this operation");
    // }
    // console.log(user);

    const doc = await StoreOwner.aggregate([
      {
        $lookup: {
          from: "orders",
          let: { orders: "$orders" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$orders"],
                },
              },
            },
          ],
          as: "orders",
        },
      },
      {
        $facet: {
          categorizedBy: [
            { $unwind: "$orders" },
            //   { $sortByCount: "$orders" },
          ],
        },
      },
    ]);

    // {
    //   $facet: {
    //     categorizedBy: [
    //       { $unwind: "$orders" },
    //       //   { $sortByCount: "$orders" },
    //     ],
    //   }
    // }
    //       // categorizedByPrice: [
    //       //   // Filter out documents without a price e.g., _id: 7
    //       //   { $match: { price: { $exists: 1 } } },
    //       //   {
    //       //     $bucket: {
    //       //       groupBy: "$price",
    //       //       boundaries: [0, 150, 200, 300, 400],
    //       //       default: "Other",
    //       //       output: {
    //       //         count: { $sum: 1 },
    //       //         titles: { $push: "$title" },
    //       //       },
    //       //     },
    //       //   },
    //       // ],
    //       // "categorizedByYears(Auto)": [
    //       //   {
    //       //     $bucketAuto: {
    //       //       groupBy: "$year",
    //       //       buckets: 4,
    //       //     },
    //       //   },
    //       // ],
    //     },
    //   },
    // ]
    //   ();
    //   .match({ _id: user.id })
    //   .unwind({
    //     path: "$orders",
    //     preserveNullAndEmptyArrays: true,
    //   })
    //   .count("ordersCount")
    //   .lookup({
    //     from: "orders",
    //     localField: "orders",
    //     foreignField: "_id",
    //     as: "Orders",
    //   });
    //   .facet({
    //     books: [{ groupBy: "$author" }],
    //     price: [{ $bucketAuto: { groupBy: "$price", buckets: 2 } }],
    //   });
    //   .unwind({
    //     path: "$orders",
    //   });
    //   .group({
    //     _id: "$_id",
    //     // "full_name": {  },
    //     Orders: { $push: "$Orders" },
    //   });

    // await StoreOwner.aggregate(
    //   [
    //     { $match: { _id: new mongoose.Types.ObjectId(user.id) } },
    //     // { $unwind: "$orders" },
    //     // {
    //     //   $lookup: {
    //     //     from: "Orders",
    //     //     let: { orders: "$orders" },
    //     //     pipeline: [
    //     //       {
    //     //         $match: {
    //     //           in: ["$orders"],
    //     //         },
    //     //       },
    //     //       {
    //     //         $project: {
    //     //           deliveryAddress: 1,
    //     //         },
    //     //       },
    //     //     ],
    //     //     as: "orders",
    //     //   },
    //     // },
    //     {
    //       $lookup: {
    //         from: "Orders",
    //         localField: "orders",
    //         foreignField: "_id",
    //         as: "inventory_docs",
    //       },
    //     },
    //     // {
    //     //   $lookup: {
    //     //     from: "Orders",
    //     //     foreignField: "_id",
    //     //     localField: "orders",
    //     //     as: "Order",
    //     //     // unwinding: { preserveNullAndEmptyArrays: false },
    //     //   },
    //     // },
    //     // { $unwind: "$Orders" },
    //     // {
    //     //   $group: {
    //     //     _id: "$orderTime",
    //     //     count: { $sum: "$orderTime" },
    //     //     Orders: { $push: "$Orders" },
    //     //   },
    //     // },
    //     // {
    //     //     $lookup: {
    //     //       from: "Orders",
    //     //       let: { orders: "$orders" },
    //     //       pipeline: [
    //     //         {
    //     //           $match: {
    //     //             $expr: { $in: ["$_id", "$$orders"] }
    //     //           }
    //     //         },
    //     //         {
    //     //           $project: {
    //     //             "deliveryAddress": 1
    //     //           }
    //     //         }
    //     //       ],
    //     //       as: "orders"
    //     //     }
    //     //   }
    //     // {
    //     //   $lookup: {
    //     //     from: "Orders",
    //     //     localField: "name",
    //     //     foreignField: "university",
    //     //     as: "courses",
    //     //   },
    //     // },
    //     // { $count: "totalOrders" },
    //     // { $unwind: "$orders" },
    //     // {
    //     //   $unwind: {
    //     //     path: "$orders",
    //     //   },
    //     // },

    //     // {
    //     //   $addFields: {
    //     //     "container.selectedItems": {
    //     //       $arrayElemAt: [
    //     //         {
    //     //           $filter: {
    //     //             input: "$allItems",
    //     //             as: "item",
    //     //             cond: { $eq: ["$$item.id", "$container.selectedItems"] },
    //     //           },
    //     //         },
    //     //         0,
    //     //       ],
    //     //     },
    //     //   },
    //     // },
    //     // {
    //     //   $group: {
    //     //     _id: "$orders.orderTime",
    //     //     totalOrder: { $sum: "$orders.finalPrice" },
    //     //   },
    //     // },
    //     // {
    //     //   $lookup: {
    //     //     from: "Orders",
    //     //     localField: "_id",
    //     //     foreignField: "orders",
    //     //     as: "Orders",
    //     //   },
    //     // },
    //     // {
    //     //   $lookup: {
    //     //     from: "Orders",
    //     //     localField: { $unwind: "$orders" },
    //     //     foreignField: "orders",
    //     //     as: "orders",
    //     //   },
    //     // },
    //     // { $unwind: "$orders" },
    //     // {
    //     //   $group: {
    //     //     _id: {
    //     //       year: { $year: "$orderTime" },
    //     //       month: { $month: "$orderTime" },
    //     //     },
    //     //     total_cost_month: { $sum: "$finalPrice" },
    //     //   },
    //     // },
    //     // { $project: { _id: 0, storeName: 1 } },
    //     // { $unwind: "$orders" },
    //   ]
    //   //
    //   //     $match: { _id: user.id },
    //   //   },
    //   //   {
    //   //     $group: {
    //   //       _id: {
    //   //         year: { $year: "$orderTime" },
    //   //         month: { $month: "$orderTime" },
    //   //       },
    //   //       total_cost_month: { $sum: "$finalPrice" },
    //   //     },
    //   //   },
    //   //   { $project: { _id: 0, storeName: 1 } },
    // ).allowDiskUse(true);
    //   .match();
    // .populate("orders", {
    //   $group: { _id: "$orderTime", totalQuantity: { $sum: "$finalPrice" } },
    // _id: {
    //   $dateToString: { format: "%Y-%m-%d", date: "$orderTime" },
    // },
    // total_today: { $sum: "$finalPrice" },
    //   group: {
    //     _id: {
    //       //   year: { $year: "$orderTime" },
    //       month: { $month: "$orderTime" },
    //       //   day: { $day: "$orderTime" },
    //     },
    //     total_cost_month: { $sum: "$finalPrice" },
    //   },
    // });
    console.log(doc);
    return doc;
  } catch (error) {
    console.log(`[ERROR]: Failed to get aggregate details | ${error.message}`);
    throw new ApolloError("Failed to get aggregate details ");
  }
};

module.exports = getAggregate;
