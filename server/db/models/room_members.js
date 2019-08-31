// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const uuidv1 = require('uuid/v1');
//   const room_members = sequelize.define('room_members', {
//     id: {
//       allowNull: false,
//       primaryKey: true,
//       type: Sequelize.UUID,
//       defaultValue: ()=> {return uuidv1()}
//     },
//     roomId: {
//       type: Sequelize.UUID,
//       references: {
//         model: rooms,
//         key: id,
//         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
//       }
//     },
//     userId: {
//       type: Sequelize.UUID,
//       // references: {
//       //   model: users,
//       //   key: id,
//       //   deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
//       // }
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     }
//   },{
//     uniqueKeys : {
//       idx_user_per_room: {
//         fields: ['roomId','userId']
//       }
//     }
//   });
//   room_members.associate = function(models) {
//     // associations can be defined here
//   };
//   return room_members;
// };