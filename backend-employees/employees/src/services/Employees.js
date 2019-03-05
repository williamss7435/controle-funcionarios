let db = require("./../database/db-con");

module.exports = {

    save(employee){

        return new Promise((resolve, reject) => {

            db.query(`
                INSERT INTO tb_employees (name_employee, rg_employee, cpf_employee, office_employee, 
                    sector_employee, salary_employee, gender_employee,marital_status_employee,
                    english_employee, schooling_employee,cnh_employee, birth_employee)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,[
                employee.name, employee.rg, employee.cpf, employee.office,
                employee.sector, employee.salary, employee.gender, employee.maritalStatus,
                employee.english, employee.schooling, employee.cnh, employee.birth
            ],(err, results) => {

                if(err) reject(Object.assign({}, err, {status: false}));
                else resolve(Object.assign({}, results, {status: true}));
                
            })

        })

    },

    edit(employee){

        return new Promise ((resolve, reject) => {

            db.query(`
                UPDATE tb_employees
                SET 
                    name_employee  = ?, 
                    rg_employee = ?, 
                    cpf_employee = ?, 
                    office_employee = ?, 
                    sector_employee = ?, 
                    salary_employee = ?, 
                    gender_employee = ?, 
                    marital_status_employee = ?, 
                    english_employee = ?, 
                    schooling_employee = ?, 
                    cnh_employee = ?, 
                    birth_employee = ? 
                WHERE id_employee = ?;
            `,[
                employee.name, employee.rg, employee.cpf, employee.office, employee.sector,
                employee.salary, employee.gender, employee.maritalStatus, employee.english, 
                employee.schooling, employee.cnh, employee.birth, employee.id 
            ], (err, result) => {

                if(err) reject(Object.assign({}, err, {status: false}))
                else resolve(Object.assign({}, result, {status: true}))

            });

        });

    },

    search(search, field = ""){
        
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    id_employee as id,
                    name_employee as name,
                    rg_employee as rg,
                    cpf_employee as cpf,
                    office_employee as office,
                    sector_employee as sector,
                    salary_employee as salary,
                    gender_employee as gender,
                    marital_status_employee as maritalStatus,
                    english_employee as english,
                    schooling_employee as schooling,
                    cnh_employee as cnh,
                    birth_employee as birth,
                    isActive_employee as isActive
                FROM tb_employees 
                WHERE 
            `;

            if(field == ""){

                sql += `
                    name_employee LIKE '%${search}%'
                    OR rg_employee LIKE '%${search}%'
                    OR cpf_employee LIKE '%${search}%'
                    OR office_employee LIKE '%${search}%'
                    OR sector_employee LIKE '%${search}%'
                `;

            }else if(field == "id"){

                sql += `
                    id_employee = ${search}
                `;

            }else{

                sql += `
                    ${field}_employee LIKE '%${search}%'
                `;

            }

            db.query(sql, (err, result) => {

                if(err) reject(err)
                else resolve(result)

            });

        });

    },

    demiss(id){

        return new Promise((resolve, reject) => {

            db.query(`
                UPDATE tb_employees
                SET isActive_employee = false
                WHERE id_employee = ?
            `,[
                id
            ],(err, result) => {

                if(err) reject(Object.assign({}, err, {status: false}))
                else resolve(Object.assign({}, result, {status: true}))

            });

        });

    },

    statistics(value = ''){
        if(value == 'detail'){
            return this.statisticsDetail();
        }else {
            return this.statistiscSummary();
        }
    },

    statistiscSummary(){
        let sql = `
        SELECT * FROM 
            (SELECT COUNT(*) qntEmployees FROM tb_employees WHERE isActive_employee = true) qntEmployees,
            (SELECT COUNT(DISTINCT office_employee) qntOffice FROM tb_employees) qntOffice,
            (SELECT COUNT(DISTINCT sector_employee) qntSector FROM tb_employees) qntSecotr,
            (SELECT COUNT(*) qntDemiss FROM tb_employees WHERE isActive_employee = false) qntDemiss,
            (SELECT SUM(salary_employee) totSalary FROM tb_employees WHERE isActive_employee) Salary,
            (SELECT COUNT(marital_status_employee) married FROM tb_employees WHERE marital_status_employee = 'Casado' AND isActive_employee = true) married,
            (SELECT COUNT(english_employee) totEnglish FROM tb_employees WHERE NOT english_employee = 'Não Possui' AND isActive_employee = true) totEnglish,
            (SELECT COUNT(schooling_employee) totUniversity FROM tb_employees WHERE schooling_employee = 'Superior' AND isActive_employee = true) totSchooling,
            (SELECT COUNT(*) lessOr30 from tb_employees WHERE (YEAR(CURRENT_TIMESTAMP) - YEAR(birth_employee)) <= 30 AND isActive_employee = true) lessOr30,
            (SELECT COUNT(*) greater30 from tb_employees WHERE (YEAR(CURRENT_TIMESTAMP) - YEAR(birth_employee)) > 30 AND isActive_employee = true) greater30;
        `;
        return this.executeBasicQuery(sql);
    },

    statisticsDetail(){
        
        return new Promise((resolve, reject) => {

            let sql = `
            SELECT * FROM
                (SELECT AVG(YEAR(CURRENT_TIMESTAMP) - YEAR(birth_employee)) avgYears FROM tb_employees WHERE isActive_employee = true) a,
                (SELECT AVG(salary_employee) avgSalary FROM tb_employees WHERE isActive_employee = true) b,
                (SELECT (COUNT(*) / @totalEmployees:=(SELECT COUNT(*) FROM tb_employees WHERE isActive_employee = true)) avgCnh FROM tb_employees WHERE isActive_employee = true AND cnh_employee = true) j,
                (SELECT (COUNT(*) / @totalEmployees) englishBasic FROM tb_employees WHERE isActive_employee = true AND english_employee = 'Básico') enBasic,
                (SELECT (COUNT(*) / @totalEmployees) englishIntermediate FROM tb_employees WHERE isActive_employee = true AND english_employee = 'Intermediario') enInter,
                (SELECT (COUNT(*) / @totalEmployees) englishAdvanced FROM tb_employees WHERE isActive_employee = true AND english_employee = 'Avancado') enAdvanced,
                (SELECT (COUNT(*) / @totalEmployees) university FROM tb_employees WHERE isActive_employee = true AND schooling_employee = 'Superior') university,
                (SELECT (COUNT(*) / @totalEmployees) married FROM tb_employees WHERE isActive_employee = true AND marital_status_employee = 'Casado') married,
                (SELECT (COUNT(*)) qntMale FROM tb_employees WHERE isActive_employee = true AND gender_employee = 'm') qntMale,
                (SELECT (COUNT(*)) qntFemale FROM tb_employees WHERE isActive_employee = true AND gender_employee = 'f') qntFemale,
                (SELECT MAX(salary_employee) maxSalary FROM tb_employees WHERE isActive_employee = true) maxSalary,
                (SELECT MIN(salary_employee) minSalary FROM tb_employees WHERE isActive_employee = true) minSalary;
            `;
            this.executeBasicQuery(sql).then(results => {
                sql = `
                    SELECT salary_employee salary, COUNT(salary_employee) qntEmployees from tb_employees WHERE isActive_employee
                    GROUP BY salary_employee;
                `;
                this.executeBasicQuery(sql).then(results2 => {

                    resolve(Object.assign({}, {data : results[0]}, {salarys: results2}))

                }).catch(error => {
                    reject(error);
                })

            }).catch(error => {
                reject(error);
            })


        });

    },

    executeBasicQuery(sql){
        return new Promise((resolve, reject) => {

            db.query(sql, (err, results) => {

                if(err) reject(err)
                else resolve(results)

            });

        });
    }

}