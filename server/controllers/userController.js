import Course from "../models/Course.js"
import Purchase from "../models/Purchase.js"
import User from "../models/User.js"
import { courseProgress } from "../models/courseProgress.js"
import razorpayInstance from "../configs/razorpay.js";
import crypto from "crypto";

//Get User Data
export const getUserData = async(req,res)=>{
    try {
        const userId = req.auth().userId
        const user = await User.findById(userId)
        if(!user){
            return res.json({success:false,message:'User Not Found'})
        }
         res.json({success:true,user})
    } catch (error) {
        res.json({success:false,message:error.message})
    
    }
}

//User Enrolled Courses With Lecture links
export const userEnrolledCourses = async(req,res)=>{
    try {
        const userId = req.auth().userId
        const userData = await User.findById(userId).populate('enrolledCourses')
        res.json({success:true,enrolledCourses:userData.enrolledCourses})
    } catch (error) {
        res.json({success:false,message:error.message})
    
    }
}
 
//Purchase Course
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.auth().userId;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.json({ success: false, message: "Data not found" });
    }

    // Prevent duplicate pending payment
    const existing = await Purchase.findOne({
      userId,
      courseId,
      status: "pending",
    });
    if (existing) {
      return res.json({ success: false, message: "Payment already in progress" });
    }

    const finalAmount = Math.round(
      (course.coursePrice -
        (course.discount * course.coursePrice) / 100) * 100
    ); // in paise

    const purchase = await Purchase.create({
      courseId,
      userId,
      amount: finalAmount / 100,
    });

    const order = await razorpayInstance.orders.create({
      amount: finalAmount,
      currency: process.env.CURRENCY,
      receipt: purchase._id.toString(),
    });

    res.json({
      success: true,
      order,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      purchaseId: purchase._id,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//update User Course Progress

 export const updateUserCourseProgress = async (req,res)=>{
      try {
        const userId = req.auth().userId
        const {courseId,lectureId}= req.body
        const progressData = await courseProgress.findOne({userId,courseId})
        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                res.json({success:true,message:'Lecture already marked as completed'})
            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        }else{
            await courseProgress.create({
                userId,
                courseId,
                lectureCompleted:[lectureId]
            })
        }
        res.json({success:true,message:'Progress Updated'})
      } catch (error) {
        res.json({success:false,message:error.message})
      }
 }

 //get user course progress

 export const getUserCourseProgress = async(req,res)=>{
    try {
        const userId = req.auth().userId
        const {courseId}= req.body
        const progressData = await courseProgress.findOne({userId,courseId})
        res.json({success:true,progressData})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
 }

 //Add User Rating to Course
    export const addUserRating = async(req,res)=>{
        const userId = req.auth().userId
        const {courseId,rating} = req.body
        if(!courseId || !userId || !rating || rating<1 || rating>5){
            return res.json({success:false,message:'Invalid Details'})
        }
        try {
            const course = await Course.findById(courseId)
            if(!course){
                return res.json({success:false,message:'Course Not Found'})
            }
            const user = await User.findById(userId)
            if(!user || !user.enrolledCourses.includes(courseId)){
            return res.json({success:false,message:'User has Not Purchased this Course'})
            }

            const existingRatingIndex = course.courseRatings.findIndex(r=>r.userId === userId)
            if(existingRatingIndex>-1){
                course.courseRatings[existingRatingIndex].rating = rating
            }else{
                course.courseRatings.push({userId,rating})
            }
            await course.save()
            res.json({success:true,message:'Rating Added Successfully'})
        } catch (error) {
            res.json({success:false,message:error.message})
        }
    }

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      purchaseId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.json({ success: false });
    }

    const user = await User.findById(purchase.userId);
    const course = await Course.findById(purchase.courseId);

    // Enroll user
    if (!course.enrolledStudents.includes(user._id)) {
      course.enrolledStudents.push(user._id);
      await course.save();
    }

    if (!user.enrolledCourses.includes(course._id)) {
      user.enrolledCourses.push(course._id);
      await user.save();
    }

    purchase.status = "completed";
    await purchase.save();

    res.json({ success: true, enrolledCourseId: course._id});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};