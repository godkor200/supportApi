const express = require("express");
const oracledb = require("oracledb");

const app = express();
const port = 3000;

require("dotenv").config();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectString: process.env.DB_connectString,
};

app.get("/", function (request, response, next) {
    console.log("!11111");
    oracledb.getConnection(
        { user: dbConfig.user, password: dbConfig.password, connectString: dbConfig.connectString },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            let query = "select * " + " from MENBERS";
            connection.execute(query, [], function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result);
                doRelease(connection, result.rows);
            });
        }
    );
    function doRelease(connection, rowList) {
        connection.release(function (err) {
            if (err) {
                console.error(err.message);
            }
            console.log("list size: " + rowList.length);
            response.send(rowList);
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
