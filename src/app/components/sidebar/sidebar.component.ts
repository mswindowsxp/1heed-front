import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Hiển Thị Tất Cả', icon: 'ni-email-83 text-primary', class: '' },
  { path: '/icons', title: 'Lọc Chưa Đọc', icon: 'ni-tag text-blue', class: '' },
  { path: '/maps', title: 'Lọc Bình Luận', icon: 'ni-badge text-orange', class: '' },
  { path: '/user-profile', title: 'Lọc Tin Nhắn', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Lọc Đánh Giá', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Lọc Có Số Điện Thoại', icon: 'ni-tablet-button text-info', class: '' },
  { path: '/register', title: 'Lọc Không Có Số Điện Thoại', icon: 'ni-fat-remove text-pink', class: '' },
  { path: '/register', title: 'Lọc Chưa Trả Lời', icon: 'ni-bell-55 text-info', class: '' },
  { path: '/register', title: 'Lọc Theo Khoảng Thời Gian', icon: 'ni-calendar-grid-58 text-orange', class: '' },
  { path: '/register', title: 'Lọc Theo Bài Viết', icon: 'ni-paper-diploma text-yellow', class: '' },
  { path: '/register', title: 'Lọc Theo Nhân Viên Được Phân Công', icon: 'ni-single-02 text-primary', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }
}
