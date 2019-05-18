import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/display-all',
    title: 'Hiển Thị Tất Cả',
    icon: 'ni-email-83 text-primary',
    class: ''
  },
  {
    path: '/filter-by-unread',
    title: 'Lọc Chưa Đọc',
    icon: 'ni-tag text-blue',
    class: ''
  },
  {
    path: '/filter-by-cmt',
    title: 'Lọc Bình Luận',
    icon: 'ni-badge text-orange',
    class: ''
  },
  {
    path: '/filter-by-message',
    title: 'Lọc Tin Nhắn',
    icon: 'ni-single-02 text-yellow',
    class: ''
  },
  {
    path: '/filter-by-vote',
    title: 'Lọc Đánh Giá',
    icon: 'ni-bullet-list-67 text-red',
    class: ''
  },
  {
    path: '/filter-have-phone-no',
    title: 'Lọc Có Số Điện Thoại',
    icon: 'ni-tablet-button text-info',
    class: ''
  },
  {
    path: '/filter-not-have-phone-no',
    title: 'Lọc Không Có Số Điện Thoại',
    icon: 'ni-fat-remove text-pink',
    class: ''
  },
  {
    path: '/filter-not-reply',
    title: 'Lọc Chưa Trả Lời',
    icon: 'ni-bell-55 text-info',
    class: ''
  },
  {
    path: '/filter-by-time',
    title: 'Lọc Theo Khoảng Thời Gian',
    icon: 'ni-calendar-grid-58 text-orange',
    class: ''
  },
  {
    path: '/filter-by-post',
    title: 'Lọc Theo Bài Viết',
    icon: 'ni-paper-diploma text-yellow',
    class: ''
  },
  {
    path: '/filter-by-empl',
    title: 'Lọc Theo Nhân Viên Được Phân Công',
    icon: 'ni-single-02 text-primary',
    class: ''
  }
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
