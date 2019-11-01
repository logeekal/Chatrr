
import { action_types } from './../actions/types';
const RoomReducer = (state, action) => {
    console.log(`Now in room Reducer with \n state: ${JSON.stringify(state)} \n action: ${JSON.stringify(action)}`);
    switch(action.type){
        case action_types.SAVE_ROOMS:
            let orderedRoomIds = [];
            let allRooms = {} 
            action.payload.map((room)=>{
                allRooms[room.id] = room;
                orderedRoomIds.push(room.id)
            })
            return {
                ...state,
                allRooms,
                orderedRoomIds
            }            
        default:
            throw new Error(`Error in RoomReducer state: ${JSON.stringify(state)} \n  action: ${JSON.stringify(action)}} `);
    }
}

export default RoomReducer;