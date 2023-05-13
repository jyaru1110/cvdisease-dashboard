const {Router} = require('express');
const router = Router();
const {get_users,get_cantidad_genero,get_cantidad_edad,get_cantidad_edad_negativo,get_cantidad_mayoria_edad,get_cantidad_diabetes,get_cantidad_hipertension,get_cantidad_fumar,get_paises_cantidad,get_cantidad_educacion,get_paises,get_cantidad_edad_pais,get_cantidad_edad_negativo_pais} = require('../controllers/user.controller');

router.get('/usuarios',get_users);
router.get('/cantidad_genero',get_cantidad_genero);
router.get('/cantidad_edad',get_cantidad_edad);
router.get('/cantidad_edad_pais/:pais',get_cantidad_edad_pais);
router.get('/cantidad_edad_negativo',get_cantidad_edad_negativo);
router.get('/cantidad_edad_negativo/:pais',get_cantidad_edad_negativo_pais);
router.get('/cantidad_mayoria_edad',get_cantidad_mayoria_edad);
router.get('/cantidad_diabetes',get_cantidad_diabetes);
router.get('/cantidad_hipertension',get_cantidad_hipertension);
router.get('/cantidad_fumar',get_cantidad_fumar);
router.get('/paises_cantidad',get_paises_cantidad);
router.get('/cantidad_educacion',get_cantidad_educacion)
router.get('/paises',get_paises);

module.exports = router;