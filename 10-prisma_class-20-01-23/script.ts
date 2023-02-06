import { PrismaClient } from '@prisma/client'
import { defaultMaxListeners } from 'events'
const prisma = new PrismaClient()
const main = async () => {
    // Write Prisma Client queries here
    console.log("It works?")

    // Get phone and console.log them
/* 	const phones = await prisma.phones.findMany({ //SELECT manufacturer, model FROM phones
		select:{
            manufacturer: true,
            model: true
        },
        where:{
            manufacturer: "Apple"
        }
	})
	console.log(phones) */
/* 	const users = await prisma.users.findMany()
	console.log(users) */

	//Get all users who´s name start with "Th" and console.log them
    /* const users = await prisma.users.findMany({
		where:{
            name: {
			    // name: "Th", //in PHP admin it works with query Th%
			    //startsWith:"Th", //in PHP admin it works with query Th%
                //endsWith: "an",
                //contains: "an",
		    }
        },
        orderBy:[
            {
                name: 'asc',
            },
            {
                id: 'desc',
            },
        ],
        take: 2,
        skip: 1,

    })
    console.log("Users:",users)
 */
    //Get the first user that matches the query
	/* const user = await prisma.users.findFirst({
        where:{
            //id:2,
            name: "Korben Dallas",
        }
    })
    console.log("User:",user); */

    // Get a specific user (only works with ID that is a unique key, Ex: Can be used for e-mail)
	/* const user = await prisma.users.findUnique({
        where:{
            id: 4,
        }
    })
    console.log('User:',user); */

    //Get a specific user and there phone
 	/* const user = await prisma.users.findUnique({
        where:{
            id:2,
        },
        include:{
            phones: true,
        }
    })
    console.log('User:',user); */

    //Get all users and their phone(s)
    /* const users = await prisma.users.findMany({
        include:{
            phones: true,
        }
    })
    console.dir(users, {depth: null}); */ //console.dir instead of console.log for getting all phones as a full object

	// Get all phones and their user (if they have one)
    const phones = await prisma.phones.findMany({
        include: {
            users: true,
        }
    })
    console.log(phones)

    }

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
