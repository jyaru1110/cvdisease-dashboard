const {Router} = require('express');
const router = Router();
const {get_users,get_cantidad_genero,get_cantidad_edad,get_cantidad_edad_negativo,get_cantidad_mayoria_edad,get_cantidad_diabetes,get_cantidad_hipertension,get_cantidad_fumar,get_paises_cantidad,get_cantidad_educacion,get_paises,get_cantidad_edad_pais,get_cantidad_edad_negativo_pais,get_cantidad_mayoria_edad_pais,get_cantidad_genero_pais,get_cantidad_educacion_pais,get_cantidad_diabetes_pais,get_cantidad_fumar_pais,get_cantidad_hipertension_pais,get_cantidad,get_pais_mas_casos,get_porcentaje_enfermos,get_mayor_nivel} = require('../controllers/user.controller');

router.get('/usuarios',get_users);
//rutas de genero
router.get('/cantidad_genero',get_cantidad_genero);
router.get('/cantidad_genero/:pais',get_cantidad_genero_pais);
//rutas de edad
router.get('/cantidad_edad',get_cantidad_edad);
router.get('/cantidad_edad_pais/:pais',get_cantidad_edad_pais);
router.get('/cantidad_edad_negativo',get_cantidad_edad_negativo);
router.get('/cantidad_edad_negativo/:pais',get_cantidad_edad_negativo_pais);
router.get('/cantidad_mayoria_edad',get_cantidad_mayoria_edad);
router.get('/cantidad_mayoria_edad/:pais',get_cantidad_mayoria_edad_pais);
//rutas de enfermedades
router.get('/cantidad_diabetes',get_cantidad_diabetes);
router.get('/cantidad_diabetes/:pais',get_cantidad_diabetes_pais);
router.get('/cantidad_hipertension',get_cantidad_hipertension);
router.get('/cantidad_hipertension/:pais',get_cantidad_hipertension_pais);
router.get('/cantidad_fumar',get_cantidad_fumar);
router.get('/cantidad_fumar/:pais',get_cantidad_fumar_pais);
//rutas de paises
router.get('/paises_cantidad',get_paises_cantidad);
router.get('/paises',get_paises);
//rutas de educacion
router.get('/cantidad_educacion',get_cantidad_educacion)
router.get('/cantidad_educacion/:pais',get_cantidad_educacion_pais)
//rutas para stats
router.get('/cantidad',get_cantidad)
router.get('/pais_mas_casos',get_pais_mas_casos)
router.get('/porcentaje_enfermos',get_porcentaje_enfermos)
router.get('/mayor_nivel',get_mayor_nivel)


module.exports = router;