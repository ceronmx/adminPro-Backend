const  getFrontEndMenu = (role = 'USER_ROLE') => {
    const menu  = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          sub: [
            {
              titulo: 'Inicio',
              ruta: '/',
            },
            {
              titulo: 'Progreso',
              ruta: 'progress',
            },
            {
              titulo: 'Gráficas',
              ruta: 'grafica1',
            },
            {
              titulo: 'Promesas',
              ruta: 'promesas',
            },
            {
              titulo: 'Rxjs',
              ruta: 'rxjs',
            },
          ],
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          sub: [
            {
              titulo: 'Hospitales',
              ruta: 'hospitales',
            },
            {
              titulo: 'Médicos',
              ruta: 'medicos',
            }
          ],
        },
      ];

      if(role === 'ADMIN_ROLE'){
        menu[1].sub.unshift({
              titulo: 'Usuarios',
              ruta: 'usuarios',
            });
      }

      return menu;
};

module.exports = {
    getFrontEndMenu
}