const db = require('../dbConfig');
const fs = require('fs');
const csv = require('fast-csv');

// Get all emails from the table
const getEmails = () => {
	return db('approved_emails');
};

// Add email to the table
const insertEmail = (email) => {
	console.log('insert email:', email);
	return db('approved_emails').insert(email);
};

const insertEmailv2 = async (email) => {
	const newemail = await db('approved_emails').insert(email);

	return newemail;
};

// Add csv file to approved_emails database
const csvInsert = (csvFile) => {
	let counter = 0;

	let csvStream = csv
		.fromString(csvFile, { headers: true })
		.on('data', (record) => {
			csvStream.pause();
			console.log(record);
			if (counter < 10) {
				const email = record.email;
				const first_name = record.first_name;
				const last_name = record.last_name;

				console.log(email);

				db.queryBuilder(
					'INSERT INTO approved_emails(email, first_name, last_name) \
                VALUES($1, $2, $3)',
					[ email, first_name, last_name ],
					(err) => {
						if (err) {
							console.log(err);
						}
					}
				);
				++counter;
			}

			csvStream.resume();
		})
		.on('end', () => {
			console.log('worked correctly');
		})
		.on('error', (err) => {
			console.log(err);
		});

	// const csvFile = csv.map(csv => {
	//     return csv.split(',')
	// })
	// // console.log(csvFile)
	// const mappedCsvFile = csvFile.map(csvF => {
	//     console.log(csvF)
	// })
	// return db('approved_emails')
	//     .insert({ 'email': data[0], 'first_name': data[1], 'last_name': data[2] })
};

// removeEmail from the table
const removeEmail = (id) => {
	return db('approved_emails').where({ id }).del();
};

module.exports = {
	getEmails,
	insertEmail,
	removeEmail,
	csvInsert,
	insertEmailv2
};
