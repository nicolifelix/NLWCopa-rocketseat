import { PrismaClient } from "@prisma/client";

//conexão com o banco
const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john--doe@gmail.com',
			avatarUrl: 'https://github.com/nicolifelix.png',					
		}
	})

	const pool = await prisma.pool.create({
		data: {
			title: 'Example Pool',
			code: 'BOL125',
			ownerId: user.id,

			participants: {
				create: {
					userId: user.id
				}
			}
		}
	})
	// const participants = await prisma.participant.create({
	// 	data: {
	// 		poolId: pool.id,
	// 		userId: user.id,
	// 	}
	// })

	await prisma.game.create({
		data: {
			date: '2022-11-12T12:00:46.158Z',
			firstTeamCountryCode: 'DE',
			secondTeamCountryCode: 'BR',
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-13T14:00:46.158Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'AR',

			guesses: {
				create: {
					firstTeamPoints: 2,
					secondTeamPoints: 1, 

					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id
							}
						}
					}
				}
			}
		},
	})
}

main()

	//https://countrycode.org/