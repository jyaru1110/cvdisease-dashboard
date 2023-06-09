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

const get_cantidad_genero_pais = async (req, res) => {
    const connection = await get_connection();
    const pais = req.params.pais;
    const result = await connection.query("SELECT COUNT(*) as m FROM Perfil_Paciente WHERE sexo = 'M' and exists (SELECT * FROM Medical_History WHERE Medical_History.ID_paciente = Perfil_Paciente.id and Medical_History.Enfermedad_card = 1) and pais='"+pais+"';");
    const result2 = await connection.query("SELECT COUNT(*) as f FROM Perfil_Paciente WHERE sexo = 'F' and exists (SELECT * FROM Medical_History WHERE Medical_History.ID_paciente = Perfil_Paciente.id and Medical_History.Enfermedad_card = 1) and pais='"+pais+"';");
    res.json({m: result[0].m, f: result2[0].f});
}

const get_cantidad_mayoria_edad = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 and Perfil_Paciente.edad >= 50;');
    const result2 = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 and Perfil_Paciente.edad < 50;');
    res.json({ma: result[0].cantidad, me: result2[0].cantidad});
}

const get_cantidad_mayoria_edad_pais = async (req, res) => {
    const connection = await get_connection();
    const pais = req.params.pais;
    const result = await connection.query("select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 and Perfil_Paciente.edad >= 50 and Perfil_Paciente.pais='"+pais+"';");
    const result2 = await connection.query("select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 and Perfil_Paciente.edad < 50 and Perfil_Paciente.pais='"+pais+"';");
    res.json({ma: result[0].cantidad, me: result2[0].cantidad});
}

const get_cantidad_fumar = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query("select count(*) as cantidad from Perfil_Paciente inner join Habitos on Habitos.ID_paciente = Perfil_Paciente.ID inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Habitos.fuma = 'YES' and Medical_History.Enfermedad_card = 1;");
    const result_2 = await connection.query("select count(*) as cantidad from Perfil_Paciente inner join Habitos on Habitos.ID_paciente = Perfil_Paciente.ID inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Habitos.fuma = 'NO' and Medical_History.Enfermedad_card = 1;");
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}

const get_cantidad_fumar_pais = async (req, res) => {
    const connection = await get_connection();
    const pais = req.params.pais;
    const result = await connection.query("select count(*) as cantidad from Perfil_Paciente inner join Habitos on Habitos.ID_paciente = Perfil_Paciente.ID inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Habitos.fuma = 'YES' and Medical_History.Enfermedad_card = 1 and Perfil_Paciente.pais='"+pais+"';");
    const result_2 = await connection.query("select count(*) as cantidad from Perfil_Paciente inner join Habitos on Habitos.ID_paciente = Perfil_Paciente.ID inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Habitos.fuma = 'NO' and Medical_History.Enfermedad_card = 1 and Perfil_Paciente.pais='"+pais+"';");
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}   

const get_cantidad_diabetes = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Diabetes = 1;');
    const result_2 = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Diabetes = 0;');
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}

const get_cantidad_diabetes_pais = async (req, res) => {
    const pais  = req.params.pais;
    const connection = await get_connection();
    const result = await connection.query("select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Diabetes = 1 and Perfil_Paciente.pais='"+pais+"';");
    const result_2 = await connection.query("select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Diabetes = 0 and Perfil_Paciente.pais='"+pais+"';");
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}


const get_cantidad_hipertension = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Hipertension = 1;');
    const result_2 = await connection.query('select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Hipertension = 0;');
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}

const get_cantidad_hipertension_pais = async (req, res) => {
    const pais  = req.params.pais;
    const connection = await get_connection();
    const result = await connection.query("select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Hipertension = 1 and Perfil_Paciente.pais='"+pais+"';");
    const result_2 = await connection.query("select COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente where Medical_History.Enfermedad_card = 1 and Medical_History.Hipertension = 0 and Perfil_Paciente.pais='"+pais+"';");
    res.json({p: result[0].cantidad, n: result_2[0].cantidad});
}

const get_cantidad_edad = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('SELECT edad,COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 GROUP BY edad');
    res.json(result);
}

const get_cantidad_edad_pais = async (req, res) => {
    const pais  = req.params.pais;
    const connection = await get_connection();
    const result = await connection.query("SELECT pais,edad,COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 and Perfil_Paciente.pais='"+pais+"' GROUP BY edad");
    res.json(result);
}

const get_cantidad_edad_negativo_pais = async (req, res) => {
    const pais  = req.params.pais;
    const connection = await get_connection();
    const result = await connection.query("select pais,edad,COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=0 and Perfil_Paciente.pais='"+pais+"' GROUP BY edad;");
    res.json(result);
}


const get_paises_cantidad = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('SELECT pais,COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=1 GROUP BY pais');
    res.json(result);
}


const get_cantidad_edad_negativo = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select edad,COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card=0 GROUP BY edad;');
    res.json(result);
}

const get_cantidad_educacion = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select Perfil_Paciente.educacion, COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card = 1 and Perfil_Paciente.educacion group by Perfil_Paciente.educacion;');
    res.json(result);
}

const get_cantidad_educacion_pais = async (req, res) => {
    let pais = req.params.pais;
    pais = pais.replace(/_/g, " ");
    const connection = await get_connection();
    const result = await connection.query("select Perfil_Paciente.educacion, COUNT(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID where Medical_History.Enfermedad_card = 1 and Perfil_Paciente.educacion and Perfil_Paciente.pais='"+pais+"' group by Perfil_Paciente.educacion;");
    res.json(result);
}

const get_paises = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('SELECT DISTINCT pais from Perfil_Paciente');
    res.json(result);
}

const get_cantidad =  async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select count(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID WHERE Medical_History.Enfermedad_card = 1');
    res.json(result);
}

const get_pais_mas_casos = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select pais, count(*) as cantidad from Perfil_Paciente inner join Medical_History on Medical_History.ID_paciente = Perfil_Paciente.ID WHERE Medical_History.Enfermedad_card = 1 group by pais order by cantidad desc limit 1');
    res.json(result);
}

const get_porcentaje_enfermos = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select sum(Medical_History.Enfermedad_card)/count(*) as porcentaje from Perfil_Paciente inner join Medical_History;');
    res.json(result);
}

const get_mayor_nivel = async (req, res) => {
    const connection = await get_connection();
    const result = await connection.query('select  Perfil_Paciente.educacion,sum(Medical_History.Enfermedad_card) as cantidad from Perfil_Paciente inner join Medical_History on Perfil_Paciente.ID = Medical_History.ID_paciente WHERE Perfil_Paciente.educacion IS NOT NULL GROUP by Perfil_Paciente.educacion ORDER by cantidad limit 1');
    res.json(result);
}


module.exports = {
    get_mayor_nivel,
    get_porcentaje_enfermos,
    get_pais_mas_casos,
    get_cantidad,
    get_users,
    get_cantidad_genero,
    get_cantidad_edad,
    get_cantidad_edad_pais,
    get_cantidad_edad_negativo,
    get_cantidad_mayoria_edad,
    get_cantidad_diabetes,
    get_cantidad_hipertension,
    get_cantidad_fumar,
    get_paises_cantidad,
    get_cantidad_educacion,
    get_paises,
    get_cantidad_edad_negativo_pais,
    get_cantidad_mayoria_edad_pais,
    get_cantidad_genero_pais,
    get_cantidad_educacion_pais,
    get_cantidad_fumar_pais,
    get_cantidad_diabetes_pais,
    get_cantidad_hipertension_pais
}