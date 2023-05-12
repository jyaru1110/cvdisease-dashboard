const {get_connection} = require('../database');

const get_users = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('SELECT * FROM Perfil_Paciente');
    res.json(result);
}

const get_cantidad_genero = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('SELECT COUNT(*) as m FROM Perfil_Paciente WHERE sexo = "M" and exists (SELECT * FROM Medical_History WHERE Medical_History.ID_paciente = Perfil_Paciente.id and Medical_History.Enfermedad_card = 1)');
    const result2 = await connection.query('SELECT COUNT(*) as f FROM Perfil_Paciente WHERE sexo = "F" and exists (SELECT * FROM Medical_History WHERE Medical_History.ID_paciente = Perfil_Paciente.id and Medical_History.Enfermedad_card = 1)');
    res.json({m: result[0].m, f: result2[0].f});
}

const get_cantidad_mayoria_edad = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 and Perfil_Paciente.edad >= 50;');
    const result2 = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 and Perfil_Paciente.edad < 50;');
    res.json({ma: result[0].cantidad, me: result2[0].cantidad});
}

const get_cantidad_fumar = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query("select count(*) as cantidad from Perfil_Paciente inner join Habitos on Habitos.ID_paciente = Perfil_Paciente.ID inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Habitos.fuma = 'YES' and Medical_History.Enfermedad_card = 1;");
    const result_2 = await connection.query("select count(*) as cantidad from Perfil_Paciente inner join Habitos on Habitos.ID_paciente = Perfil_Paciente.ID inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Habitos.fuma = 'NO' and Medical_History.Enfermedad_card = 1;");
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}

const get_cantidad_diabetes = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Diabetes = 1;');
    const result_2 = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Diabetes = 0;');
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}

const get_cantidad_hipertension = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Hipertension = 1;');
    const result_2 = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Hipertension = 0;');
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}

const get_cantidad_edad = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('SELECT edad,COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 GROUP BY edad');
    res.json(result);
}


const get_cantidad_edad_negativo = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select edad,COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=0 GROUP BY edad;');
    res.json(result);
}
module.exports = {
    get_users,
    get_cantidad_genero,
    get_cantidad_edad,
    get_cantidad_edad_negativo,
    get_cantidad_mayoria_edad,
    get_cantidad_diabetes,
    get_cantidad_hipertension,
    get_cantidad_fumar
}