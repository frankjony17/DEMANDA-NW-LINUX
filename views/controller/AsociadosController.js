
Ext.define('CULINARIA.controller.AsociadosController', {
    extend: 'Ext.app.Controller',

    control: {
        'grid-asociados-pago': {
            afterrender: "afterRenderPago",
            edit: "editPagoPendiente",
            cuotaActionClick: "cuotaActionClick"
        },
        'grid-pagos-pendientes': {
            edit: "editPagoPendiente"
        },
        /* ASOCIADOS */
        'grid-asociados': { afterrender: "afterRenderAsociados" },
        'grid-asociados [text=Adicionar]': { click: "showWindowAsociados" },
        'grid-asociados [text=Eliminar]': { click: "confirmAsociados" },
        'asociados-form': { afterrender: "afterRenderWindowAsociados" },
        'asociados-form [text=Salvar]': { click: "isValidAsociados" },
        'asociados-form [text=Editar]': { click: "isValidAsociados" },
    },
    afterRenderPago: function (grid) {
        this.store = grid.getStore();
    },
    cuotaActionClick: function (record) {
        this.record = record;
        if (record.get('pendientePago') > 0) {
            this.grid = Ext.create('CULINARIA.view.asociados.PagosPendientesGrid');
            this.loadStorePago(record);
            this.win = Ext.create('Ext.window.Window', {
                title: 'Pagos pendientes',
                items: this.grid,
                modal: true,
                height: 400
            });
            this.win.show();
        }
    },
    /* EDIT-PAGOS-PENDIENTES */
    editPagoPendiente: function (editor, context, eOpts) {
        var me = this, d = new Date(), record = context.record;
        CULINARIA.Model.AsociadosPago.update({
            fechaPago: d.getFullYear() +"-"+ d.getMonth() +"-"+ d.getDate()
        },{
            where: { id: record.get('id') }
        }).then(function () {
            me.store.reload();
            me.win.close();
        }).catch(function (error) {
            CULINARIA.ERROR(error);
        });
        Ext.toast('Operación realizada exitosamente.', 'Actualización OK');

    },
    loadStorePago: function (record) {
        var data = [], me = this;
        CULINARIA.Model.AsociadosPago.findAll({
            where: { asociado_id: record.get('id'), fechaPago: 0 },
            include: [{
                model: CULINARIA.Model.APagar
            }]
        }).then(function (pago) {
            pago.forEach(function(p){
                data.push({
                    id: p.id,
                    mes: me.getMonth(p.mes),
                    cuota: p.APagar.cuota,
                    talonario: p.talonario,
                    estado: true
                });
            });
            me.grid.getStore().loadData(data);
        });
    },
    /* ASOCIADOS */
    afterRenderAsociados: function (grid) {
        this.gridAsociados = grid;
        this.storeAsociados = grid.getStore();
    },
    afterRenderWindowAsociados: function (win) {
        this.winAsociados = win;
        this.formAsociados = win.down('form');
    },
    showWindowAsociados: function () {
        Ext.create('CULINARIA.view.asociados.AsociadosForm',{
            autoShow: true,
            btnText: 'Salvar',
            title: 'Adicionar Asociado'
        });
    },
    isValidAsociados: function (btn) {
        if (this.formAsociados.getForm().isValid()){
            var record = this.formAsociados.getValues();
            /* On Add action */
            if (btn.text === "Salvar"){
                this.add(record, this.formAsociados.getForm(), this.storeAsociados);
            } /* On Edit action */
            else {
                this.update(record, this.storeAsociados, this.winAsociados);
            }
        } else {
            CULINARIA.View.Msg.question('Atención', '<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.');
        }
    },
    add: function (record, form, store) {
        var d = new Date();
        CULINARIA.Model.Asociados.create({
            fechaAsociacion: d.getFullYear() +"-"+ (d.getMonth() + 1) +"-"+ d.getDate(),
            observaciones: record['observaciones'],
            persona_id: record['nombre_apellidos']
        }).then(function (asociado) {
            CULINARIA.Model.APagar.find().then(function (a_pagar) {
                for (var i = (d.getMonth() + 1); i <= 12; i++) {
                    CULINARIA.Model.AsociadosPago.create({
                        mes: i,
                        fechaPago: 0,
                        asociado_id: asociado.id,
                        a_pagar_id: a_pagar.id
                    }).then(function () {
                        store.reload();
                    })
                }
            });
        }).catch(function (error) {
            CULINARIA.ERROR(error);
        });
    },
    update: function () {

    },
    confirm: function () {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar los registro seleccionado?', this.remove, this);
        } else {
            CULINARIA.View.Msg.question('Atención', 'Seleccione el o los registro que desea eliminar.');
        }
    },
    remove: function (confirm) {
        var me = this;
        if (confirm === 'yes') {
            Ext.Array.each(me.grid.selModel.getSelection(), function (row) {
                CULINARIA.Model.Asociados.destroy({
                    where: { id:row.get('id') }
                });
            });
            me.grid.store.load();
        }
    },
    getMonth: function (m) {
        var mes;
        switch (m) {
            case 1:
                mes = 'Enero';
                break;
            case 2:
                mes = 'Febrero';
                break;
            case 3:
                mes = 'Marzo';
                break;
            case 4:
                mes = 'Abril';
                break;
            case 5:
                mes = 'Mayo';
                break;
            case 6:
                mes = 'Junio';
                break;
            case 7:
                mes = 'Julio';
                break;
            case 8:
                mes = 'Agosto';
                break;
            case 9:
                mes = 'Septiembre';
                break;
            case 10:
                mes = 'Octubre';
                break;
            case 11:
                mes = 'Noviembre';
                break;
            case 12:
                mes = 'Diciembre';
                break;
        }
        return mes;
    }
});