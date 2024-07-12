from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path("login/", views.login_check, name='login'),
    path('isloggedin/',views.isloggedin,name='isloggedin'),
    path('userprofile/',views.userprofile,name='userprofile'),
    path('signup/',views.signup,name='signup'),
    path('logout/',views.logout_check,name='logout'),
    path("group/",views.usertype,name='usertype'),
    path('addcart/',views.addcart,name='addcart'),
    path('viewcart/',views.viewcart,name='viewcart'),
    path('deletecartitem/<str:product_name>/', views.delete_cart_item, name='delete_cart_item'),
    path('meals/', views.get_meals, name='get_meals'),
    path('checkout/', views.checkout, name='checkout'),
    path('update_order/', views.update_order, name='update_order'),
    path('create-payment-intent/', views.create_payment_intent, name='create_payment_intent'),
]
