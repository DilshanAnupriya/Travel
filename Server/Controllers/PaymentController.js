const Payment = require('../Models/PaymentModel');

const MakePayment = async(req,res)=>{
    try {
      const makePayment = new Payment(req.body);
      await makePayment.save();
      res.status(200).json({message:"success ",data:makePayment});
    } catch (e) {
        res.status(200).json({error:e.message});
    }
};

const TodayIncome = async (req,res)=>{
    try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        today.setHours(0,0,0,0);
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 1);

        const data = await Payment.find({
            date: {
                $gte: today, 
                $lt: endDate  
            }
        });
        const incomeToday = data.reduce((sum,payment)=>sum+payment.amount,0);
        res.status(200).json({message:"today income ",data:incomeToday});
    } catch (e) {
        res.status(200).json({error:e.message});
    }
};

const MonthlyIncome = async (req,res)=>{
    try {
        const now = new Date();
        const startMonth = new Date(now.getFullYear(),now.getMonth(),1); //now.getFullYear() => 2024 | now.getMonth() => 11 (December, because months are zero-based)  1 => Sets the day to December 1.
        const endMonth = new Date(now.getFullYear(),now.getMonth()+1,1);
        const data = await Payment.find({
            date:{
                $gte:startMonth,
                $lt:endMonth
            }
        });
        const income  = data.reduce((sum,Payment)=>{
            const day =  Payment.date.toISOString().split('T')[0];
            sum[day] = (sum[day] || 0)+Payment.amount;
            return sum;
        },{});

        const totalIncome = data.reduce((sum,payment)=>sum+payment.amount,0);
        res.status(200).json({message:"Monthly income ",data:{month:now.getMonth()+1,income:income},totalIncome:totalIncome});
    } catch (e) {
        res.status(200).json({error:e.message});
    }
};

const weekIncome = async (req,res)=>{
    try {
        const now = new Date();
        const startWeek = new Date(now); // get today date 
        if(now.getDay() == 0){
            startWeek.setDate((now.getDate()-now.getDay())-6); 
        }else{
            startWeek.setDate((now.getDate()-now.getDay())+1);// getDay means => sunday = 0 , monday = 1,.... imagine today 28 sat (getDate) and getday = 6 so 28-6 +1 = 23 => 23 is Monday so start week from monday
        }
        startWeek.setHours(0,0,0,0); // when Output of startweek : Fri Dec 29 2024 14:30:45 GMT+0000 (UTC) and when the set hours implement output will be Output: Fri Dec 29 2024 00:00:00 GMT+0000 (UTC)

        const endWeek = new Date(startWeek);
        endWeek.setDate(startWeek.getDate()+6);
        const data = await Payment.find({
            date:{
                $gte:startWeek,
                $lt:endWeek
            }
        });
        const income = data.reduce((sum,payment)=>sum+payment.amount,0); // 0 means initial value start from 0
        res.status(200).json({message:"this week income ",data:income});
    } catch (e) {
        res.status(200).json({error:e.message});
    }
};

const TotalIncome = async (req,res)=>{
    try {
        const now = new Date();
        const data = await Payment.find({})
        const totalIncome = data.reduce((sum,payment)=>sum+payment.amount,0);
        res.status(200).json({message:"total income ",totalIncome:totalIncome});
    } catch (e) {
        res.status(200).json({error:e.message});
    }
};

module.exports ={
    MakePayment,TodayIncome,MonthlyIncome,TotalIncome,weekIncome
}