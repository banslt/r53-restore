const pageSize = 490;
const fs = require('fs')

const paginateBatchChanges = (backupRecordsListPath) => {
    const backupRecordsList = require(`./${backupRecordsListPath}`);
    for (let page = 0; page < Math.ceil(backupRecordsList.length / pageSize); page++) {
        const changeBatch = {
            Comment: "record updated with route53-restore",
            Changes: [],
        }
        backupRecordsList.slice(page * pageSize, Math.min((page + 1) * pageSize, backupRecordsList.length)).forEach((recordset) => {
            changeBatch.Changes.push({
                Action: "UPSERT",
                ResourceRecordSet: recordset
            })
        })
        fs.writeFile(`changeBatch${page}.json`, JSON.stringify(changeBatch, null, 2), { flag: "w+" },
            (err, data) => {
                if (err) throw new Error(`Smth gone wrong: ${err}`)
            });
    }
}


paginateBatchChanges(process.argv[2]);
