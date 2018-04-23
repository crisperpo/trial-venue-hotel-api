var faker = require ('faker');

var arraySubset = function (array, subsetSize) {
	var subsetLength = (subsetSize <= array.length) ? subsetSize : faker.random.number(array.length),
		subset = [],
		element;

	for (var i = 0; i < subsetLength; i++) {
		element = faker.random.arrayElement(array);
		array = array.filter(function (e) { return e !== element});
		subset.push(element);
	}
	return subset;
};

module.exports = function () {
	var data = {
		hotels: []
	},
	hotel,
	room,
	roomsNumber;

	for (var i = 0; i < 6; i++) {
		hotel = {
			id: faker.random.uuid(),
			name: faker.company.companyName(1),
			description: faker.lorem.sentence(),
			distance_to_venue: faker.random.number(1000),
			rating: faker.finance.amount(0, 5, 1),
			price_category: faker.random.arrayElement(['low','medium','high']),
			amenities: arraySubset(['free-parking','free-wifi','pets','restaurant','gym','pool','spa']),
			images: arraySubset([
				"imgHotel1_640x427.jpeg",
				"imgHotel2_640x427.jpeg",
				"imgHotel3_640x427.jpeg",
				"imgHotel4_640x427.jpeg"
			], 3),
			rooms: []
		};

		roomsNumber = faker.random.number({min: 2, max: 6});

		for (var j = 0; j < roomsNumber; j++) {
			room = {
				id: faker.random.uuid(),
				name: faker.lorem.sentence(2),
				description: faker.lorem.sentence(),
				max_occupancy: faker.random.number({min: 1, max:10}),
				price_in_usd: faker.finance.amount(10, 400, 2)
			};
			hotel.rooms.push(room);
		}

		data.hotels.push(hotel);
	}
	return data;
};