const Booking =require('../Models/BookingModel');

const CreateBooking = async (req, res) => {
    try {
        const { roomId, start_date, end_date } = req.body;

        // Check if the room is already booked in the given date range
        const isAvailable = await Booking.findOne({
            roomId: roomId,
            $and: [
                { start_date: { $lte: end_date, $gte: start_date } }, // Overlap case 1
                { end_date: { $gte: start_date, $lte: end_date } }, // Overlap case 2
                { start_date: { $lte: start_date }, end_date: { $gte: end_date } } // Booking fully overlaps the range
            ]
        });

        if (!isAvailable) {
            return res.status(404).json({ message: "Room is not available for the selected dates." });
        }

        // Create new booking
        const newBooking = new Booking(req.body);
        await newBooking.save();
        return res.status(201).json({ message: "Booking created successfully", booking: newBooking });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const GetAllBookings = async(req,res)=>{
    try {
        const {searchText='',page=1,size=10} = req.query;
        const filter = searchText?{$or:[
            {date:{$regex:searchText,$options:'i'}},
            {traveler:{$regex:searchText,$options:'i'}}
        ]}:{};
        const all = await Booking.find(filter).sort({start_date:-1}).skip((page-1)*size).limit(parseInt(size));
        const count = await Booking.countDocuments();
        res.status(200).json({message:"list",data:all,count:count});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const GetBookingById = async(req,res)=>{
    try {
        const selectedBooking = await Booking.findById(req.params.id);
        if(selectedBooking){
            return res.status(200).json({message:"success",data:selectedBooking});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const UpdateBooking = async(req,res)=>{
    try {
       const updatebook = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
       );
       if(updatebook){
        return res.status(200).json({message:"success",data:updatebook});
       }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const DeleteBooking  = async(req,res)=>{
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if(deletedBooking){
            return res.status(200).json({message:"success",data:deletedBooking});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
module.exports={
    CreateBooking,GetAllBookings,GetBookingById,UpdateBooking,DeleteBooking
};


