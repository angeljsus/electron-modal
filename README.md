# Ventanas Modales

### Descripción
Funcionalidad para crear ventanas modales nativamente dentro de una aplicación Electron Js.

#### Configuración

##### webContents
Se utiliza [webContents](https://www.electronjs.org/docs/latest/api/web-contents) para renderizar y controlar la página web.

```javascript
const { app, webContents, BrowserWindow, globalShortcut } = require('electron');
```

##### createWindow()
Dentro de la función para crear la ventana de la aplicación se registran las ventanas modales que serán llamadas desde el archivo javascript de la aplicación, para esto es necesario agregar un nuevo `BrowserWindow`, identificando las propiedades recibidas desde la función `setWindowOpenHandler(handler)` y validandolas para saber que ventana modal esta requiriendo. A continuación, se muestra la configuración:

```javascript
function createWindow () {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1366,
    height: 768,
    minWidth: 1366,
    minHeight: 768,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    let json = JSON.parse(details.features); // parsea las medidas que tendrá la ventana al abrir
    if (details.url === 'about:blank') { // solo permitirá abrir ventanas con la url about:blank
      const modalWin = new BrowserWindow({ // crea una ventana heredada
        parent: mainWindow, // se asigna como hijo de la ventana principal de la aplicación
        modal: true, // es modal
        center: true, // posición en la que aparecerá
        width: json.width, // agregan las medida recibidas y almacenadas dentro de la variable json
        height: json.height, 
        minWidth: json.width,
        minHeight: json.height,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          nativeWindowOpen: true,
        }
      })
    
      switch(details.frameName){ // validar los modales, para abrir con el archivo que corresponde
        case 'modal_uno':
            modalWin.loadFile('modales/modal_uno/modal.html')
          break;
        case 'modal_dos':
            modalWin.loadFile('modales/modal_dos/modal.html')
          break;
        default:
            console.log('El modal "%s" no esta registrado, a un archivo html', details.frameName);
            modalWin.destroy();
            break;
      }
    }
    return { action: 'deny' };
  })
  mainWindow.loadFile('index.html')
}
```

##### Crear directorios y archivos

Las rutas añadidas dentro del `switch` deben tener los archivos a los que hace referencia. Dentro de los archivos `html` agregar los archivos de estilos y de scripts correspondientes para ejecutar las funcionalidades del modal.
```tree
-- app_dir
    -- modales/modal_uno/modal.html
    -- modales/modal_uno/js/file.js
    -- modales/modal_uno/css/file.css
-- app_dir
    -- modales/modal_uno/modal.html
    -- modales/modal_uno/js/file.js
    -- modales/modal_uno/css/file.css
```

#### Llamar los modales registrados

##### createModal(width, height, name)

**Descripción**

La función manda llamar los modales creados dentro del archivo de la aplicación.

**Parámetros**
- **width** *(number)** : medida en píxeles de lo largo que tomará el modal al abrirse.
- **height** *(number)** : medida en píxeles de lo alto que tomará el modal al abrirse.
- **name** *(string)** : el nombre del modal que esta llamando, debe ser alguno de los registrados.


**Resultados**
```javascript
opnModalUno.addEventListener('click', function(){
	createModal(250, 400, 'modal_uno'); // abre modal registrado
})

opnModalDos.addEventListener('click', function(){
	createModal(500, 400, 'modal_dos'); // abre modal registrado
})

opnModalFke.addEventListener('click', function(){
	createModal(500, 400, 'fakeModal'); // abre y cierra ventana, muestra mensaje en consola: El modal "fakeModal" no esta registrado.
})
```