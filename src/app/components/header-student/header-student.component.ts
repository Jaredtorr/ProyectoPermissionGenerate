import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNotifyComponent } from '../modal-notify/modal-notify.component';
import { NotifyService } from '../../services/notify/notify.service';
import { AuthService } from '../../services/auth/auth.service';
import { Notify } from '../../models/notify';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-student',
  standalone: true,
  imports: [CommonModule, ModalNotifyComponent],
  templateUrl: './header-student.component.html',
  styleUrl: './header-student.component.css'
})
export class HeaderStudentComponent implements OnInit, OnDestroy {
  name: string = 'Toledo';
  showNotification: boolean = false;
  notifications: Notify[] = [];
  unreadCount: number = 0;
  
  private notificationsSubscription?: Subscription;
  private unreadCountSubscription?: Subscription;
  private currentUserId: number | null = null;

  constructor(
    private notifyService: NotifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el usuario logueado
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser && currentUser.userId) {
      this.currentUserId = currentUser.userId;
      this.name = currentUser.name; // Actualizar el nombre del usuario
      console.log(`👤 Usuario logueado: ${currentUser.name} (ID: ${currentUser.userId})`);
      
      // Solicitar permisos de notificación del navegador
      this.notifyService.requestNotificationPermission();
      
      // Conectar al WebSocket con el userId del usuario logueado
      this.notifyService.connect(currentUser.userId);
      
      // Suscribirse a las notificaciones en tiempo real
      this.notificationsSubscription = this.notifyService.notifications$
        .subscribe(notifications => {
          this.notifications = notifications;
          console.log(`📋 Notificaciones actualizadas en header: ${notifications.length}`);
        });
      
      // Suscribirse al contador de no leídas
      this.unreadCountSubscription = this.notifyService.unreadCount$
        .subscribe(count => {
          this.unreadCount = count;
          console.log(`🔢 Contador no leídas: ${count}`);
        });
    } else {
      console.warn('⚠️ No hay usuario logueado, no se conectará al WebSocket');
    }
  }

  ngOnDestroy() {
    console.log('🧹 Destruyendo HeaderStudentComponent...');
    
    // Desconectar el WebSocket al destruir el componente
    this.notifyService.disconnect();
    
    // Cancelar suscripciones
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
    if (this.unreadCountSubscription) {
      this.unreadCountSubscription.unsubscribe();
    }
  }

  toggleNotification() {
    this.showNotification = !this.showNotification;
    console.log(`🔔 Modal de notificaciones: ${this.showNotification ? 'abierto' : 'cerrado'}`);
  }

  closeNotification() {
    this.showNotification = false;
    console.log('❌ Modal de notificaciones cerrado');
  }

  markNotificationAsRead(notificationId: number) {
    console.log(`✅ Marcando notificación ${notificationId} como leída...`);
    
    this.notifyService.markAsRead(notificationId)
      .subscribe({
        next: () => {
          // Actualizar la notificación localmente
          this.notifications = this.notifications.map(n => 
            n.notificationId === notificationId 
              ? { ...n, leido: true }
              : n
          );
          
          // Actualizar el contador
          this.unreadCount = this.notifications.filter(n => !n.leido).length;
          
          console.log(`✅ Notificación ${notificationId} marcada como leída`);
        },
        error: (err) => console.error('❌ Error al marcar como leída:', err)
      });
  }

  markAllAsRead() {
    if (!this.currentUserId) {
      console.error('❌ No hay usuario logueado');
      return;
    }

    console.log('✅ Marcando todas las notificaciones como leídas...');
    
    this.notifyService.markAllAsRead(this.currentUserId)
      .subscribe({
        next: () => {
          // Recargar notificaciones
          this.notifyService.loadNotifications(this.currentUserId!);
          console.log('✅ Todas las notificaciones marcadas como leídas');
        },
        error: (err) => console.error('❌ Error al marcar todas como leídas:', err)
      });
  }

  sendToHistory(event: Event) {
    event.preventDefault();
    this.router.navigate(['student/history'])
  }
}