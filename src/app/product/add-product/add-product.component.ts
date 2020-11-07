import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product = { nameEn: "", nameNl: "", calories: "" };
  products;
  sproduct;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router, private pService: ServiceService) { }

  ngOnInit(): void {
    this.pService.getAllProducts({}).subscribe(res => {
      if (res.status == true) {
        this.products = res.data        
      }
    })
  }

  addProduct(form: NgForm) {
    this.pService.createProduct(this.product).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.toastr.success("Product Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  update(edit, i) {
    this.sproduct = this.products[i];
    // console.log(this.sProtein);
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: "dark-modal" });
  }

  updateProduct() {
    this.pService.updateProduct(this.sproduct._id, this.sproduct).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Product Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deleteProduct(productId, i) {
    if (confirm('Are you sure you want to delete the product?')) {
      this.pService.deleteProduct(productId).subscribe(res => {
        if (res.status === true) {
          this.products.splice(i, 1);
          this.toastr.success("Product Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        } else {
          this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        }
      })
    }
  }
}
