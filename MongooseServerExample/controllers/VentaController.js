const VentaDAO = require('../dataAccess/VentaDAO')
const {AppError} = require('../utils/appError')

class VentaController{
    static async crearVenta(req,res,next){
        try {
            const { total, iva, productos } = req.body;
      
            if (!total || !iva || !productos) {
              return next(new AppError('Los campos total, iva y productos son obligatorios', 400));
            }
      
            const ventaData = { total, iva, productos };
            const venta = await VentaDAO.crearVenta(ventaData);
            res.status(201).json(venta);
          } catch (error) {
            next(new AppError('Error al crear la venta', 500));
          }
    }
    static async obtenerVentaPorId(req, res, next) {
        try {
          const id = req.params.id;
          const venta = await VentaDAO.obtenerVentaPorId(id);
    
          if (!venta) {
            return next(new AppError('No se encontró la venta', 404));
          }
    
          res.status(200).json(venta);
        } catch (error) {
          next(new AppError('No se logró obtener la venta', 500));
        }
      }
      static async obtenerVentas(req, res, next) {
        try {
          const limit = req.query.limit || 10;
          const ventas = await VentaDAO.obtenerVentas(limit);
          res.status(200).json(ventas);
        } catch (error) {
          next(new AppError('No se logró obtener las ventas', 500));
        }
      }

      static async actualizarVenta(req, res, next) {
        try {
          const id = req.params.id;
          const ventaData = req.body;
          const venta = await VentaDAO.actualizarVenta(id, ventaData);
    
          if (!venta) {
            return next(new AppError('No se encontró la venta', 404));
          }
    
          res.status(200).json(venta);
        } catch (error) {
          next(new AppError('Error al actualizar la venta', 500));
        }
      }

      static async eliminarVenta(req, res, next) {
        try {
          const id = req.params.id;
          const venta = await VentaDAO.eliminarVenta(id);
    
          if (!venta) {
            return next(new AppError('No se encontró la venta', 404));
          }
    
          res.status(200).json({ message: 'Venta eliminada correctamente' });
        } catch (error) {
          next(new AppError('Error al eliminar la venta', 500));
        }
      }

      static async agregarProductosAVenta(req, res, next) {
        try {
          const idVenta = req.params.id; 
          const productos = req.body.productos; 
    
          if (!idVenta || !productos) {
            return next(new AppError('ID de venta y productos son obligatorios', 400));
          }
    
          const venta = await VentaDAO.agregarProductosAVenta(idVenta, productos);
          res.status(200).json(venta);
        } catch (error) {
          next(new AppError('Error al agregar productos a la venta', 500));
        }
      }

      static async obtenerDesgloseVenta(req, res, next) {
        try {
          const idVenta = req.params.id; 
          if (!idVenta) {
            return next(new AppError('ID de venta es obligatorio', 400));
          }
    
          const desgloseVenta = await VentaDAO.obtenerDesgloseVenta(idVenta);
          res.status(200).json(desgloseVenta);
        } catch (error) {
          next(new AppError('Error al obtener el desglose de la venta', 500));
        }
      }

      static async obtenerTodasLasVentasConDesglose(req, res, next) {
        try {
          const ventasConDesglose = await VentaDAO.obtenerTodasLasVentasConDesglose();
          res.status(200).json(ventasConDesglose);
        } catch (error) {
          next(new AppError('Error al obtener todas las ventas con desglose', 500));
        }
      }
}
module.exports = VentaController;