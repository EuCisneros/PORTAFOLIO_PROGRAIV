var DBDATOS = openDatabase('dbdatos', '1.0','restro de datos',5*1024*1024);
window.id = 0;

if(!DBDATOS){
    alert("El Navegador no soporta Web SQL");
}
var appVue = new Vue({ 
    el: '#appRegistro',
    data: {
        dto:{
            idDatos : 0,
            codigo  : '',
            nombre  : '',
            direccion  : '',
            municipio   : '',
            departamento    : '',
            telefono    : '',
            fecha   : '',
            sexo    : '',
        },
        dtos:[]
    },
    methods:{
        guardarDatos(){
            DBDATOS.transaction(tran=>{
                tran.executeSql(' INSERT INTO dto(idDatos,codigo,nombre,direccion,municipio,departamento,telefono,fecha,sexo) VALUES(?,?,?,?,?,?,?,?,?)', 
                [++id,this.dto.codigo,this.dto.nombre,this.dto.direccion,this.dto.municipio,this.dto.departamento,this.dto.telefono,this.dto.fecha,this.dto.sexo]);
                this.obtenerdtos();
                this.limpiar();
            }, err=>{
                Console.log( err );

            });
        },
        obtenerdtos(){
            DBDATOS.transaction(tran=>{
                tran.executeSql('SELECT * FROM dto',[],(index,data)=>{
                    this.dtos = data.rows;
                    id=data.rows.length;
                    
                });

            }, err=>{
                console.log( err );
            });
        },
        mostrardto(d){
            this.dto = d;
        },
        limpiar(){
            this.dto.codigo='';
            this.dto.nombre='';
            this.dto.direccion='';
            this.dto.municipio='';
            this.dto.departamento='';
            this.dto.telefono='';
            this.dto.fecha='';
            this.dto.sexo='';
        }
    },
   
    created(){
        DBDATOS.transaction(tran=>{
        tran.executeSql('CREATE TABLE IF NOT EXISTS dto(idDatos int primary key not null, codigo varchar(10), nombre varchar(65), direccion varchar(65), municipio varchar(65), departamento varchar(65), telefono varchar(65), fecha varchar(65), sexo varchar(65))');
    }, err=>{
        console.log( err );
    });
    this.obtenerdtos();
    }
});
