import { quotes, users } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


const User = mongoose.model("User")
const Quote = mongoose.model("Quote")


const resolvers = {
  Query: {
    /** below mentioned codes are when we raise query via mongo */
    users: async () => await User.find({}),
    
    user: async (_, {_id}) =>  await User.findOne({_id}) ,
    
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),

    iquote: async (_, { by }) => await Quote.find({by}),

    myprofile: async (_,args,{userId}) => {
      if(!userId) throw new Error("You must log in first to create a new quote")
      return await User.findOne({_id:userId})
    }

    /** below mentioned lines were written when we were manually writing and testing code */
    // users: () => users,   
    //user: (_, args) => users.find((user) => user._id == args._id), "OR ->below code"
    //user:(_,{_id})=>user.find(user => user._id == _id)
    // quotes: () => quotes,
    //    iquote:(_,args)=>quotes.filter(quote=>quote.by == args.by)
    // iquote: (_, { by }) => quotes.filter((quote) => quote.by == by),
  },
  User: {
    quotes: async (singleUser) => await Quote.find({by:singleUser._id})

    // quotes: (singleUser) => quotes.filter((quote) => quote.by == singleUser._id),
  },
  Mutation: {
    // signupUserDummy:(_,{userNew})=>{
    //   const _id = randomBytes(5).toString("hex")
    //   users.push({
    //     _id, ...userNew
    //   })
    //   return users.find(user=>user._id == _id)
    // }
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({email:userNew.email})
      if(user){
        throw new Error("User already exists with this email")
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12)

      const newUser = new User({
        ...userNew,
        password:hashedPassword
      })
      return await newUser.save()
    },
    signinUser: async (_, { userSignin }) => {
      // sign in of the registered user
      const user = await User.findOne({email:userSignin.email})
      if(!user){
        throw new Error("User does not exist with the given email")
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password)
      if(!doMatch){
        throw new Error("invalid email or password")
      }
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET)
        // return {token:token}       // as key:value has same value so we can write as below
        return {token}
    },
    // createQuote:(_,{name}, {userId}) ===> meaning "_" - denotes parent, {name} denotes arguments, "{userId}" denotes context decribed in server.js file for the middleware mentioned
    createQuote: async (_,{name}, {userId})=>{
      if(!userId) throw new Error("You must log in first to create a new quote")
      const newQuote =  new Quote({
        name,           // or can be written as name:name
        by:userId
      })
      await newQuote.save()
      return ("Quote Saved Successfully")
    }
  },
};

export default resolvers;
