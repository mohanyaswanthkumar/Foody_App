from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Person,Cart,Order
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render,get_object_or_404
from django.http import HttpResponseForbidden
from django.contrib.auth.models import User
from django.contrib.auth import *
from django.contrib.auth.models import *
from django.core.files.base import ContentFile
import base64
import requests
from django.core.mail import send_mail
import stripe
from django.conf import settings
def index(request):
    return HttpResponse(request.user)

def usertype(request):
    if request.user.is_authenticated:
        user=request.user
        if user.groups.exists():
            group=user.groups.first().name
            return JsonResponse({'group':group})
        else:
            return JsonResponse({'group':None})
    else:
        return JsonResponse({'group':None})

def userthere(request):
    return request.user

@csrf_exempt 
def isloggedin(request):
    data={'isloggedin':False}
    print('checking')
    if request.user.is_authenticated:
        data['isloggedin'] = True
    print(data)
    print(request.user)
    print(request.user.id)
    print(request.user.username)
    vat=userthere(request)
    return JsonResponse(data)

@csrf_exempt
def login_check(request):
    if request.method == 'POST':
        print("if part")
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            print(username,password)
            # username='nani'
            # password='Nani@123'
            user = authenticate(request,username=username, password=password)
            if user is not None:
                print(user)
                login(request, user)
                request.user=user
                print(request.user)
                #send_mail("Registration Successfull","You are logged in successfully","bitramohanyaswanthkumar@gmail.com",[request.user.email], fail_silently=False,)
                #return HttpResponse(request.user)
                return JsonResponse({'success': True})
            else:
                print('created')
                user = User.objects.create_user(username=username,password=password)
                user.save()
                #return HttpResponse(request.user)
                return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
        except Exception as e:
            #return HttpResponse(e)
            return JsonResponse({'success': False, 'message': 'An error occurred'}, status=500)
    else:
        # username='nani'
        # password='Nani@123'
        print("else part")
        user = authenticate(request,username=username, password=password)
        if user is not None:
            print(user)
            login(request, user)
            request.user=user
            print(request.user)
            #send_mail("Registration Successfull","You are logged in successfully","bitramohanyaswanthkumar@gmail.com",[request.user.email], fail_silently=True)
        #return HttpResponse(request.user)
        return JsonResponse({'success': True})

@csrf_exempt  
def signup(request):
    data = json.loads(request.body)
    # username = request.POST.get('username')
    # password = request.POST.get('password')
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    user = User.objects.create_user(username=username,email=email,password=password)
    user.save()
    try:
        person = Person(username=username,password=password,email=email)
        person.save()
        return JsonResponse({"message":"User created successfully!"},status=201)
    except Exception as e:
        print(e)
        return JsonResponse({"message": "Error found"})

@csrf_exempt 
@login_required
def logout_check(request):
    logout(request)
    return HttpResponse(request.user)
    #return JsonResponse({'success': True})

@csrf_exempt 
@login_required
def userprofile(request):
    try:
        username = request.user.username
        print(username)
        # user=Person.objects.get(name=request.user)
        # print(user)
        return JsonResponse({'username': request.user.username,'email':request.user.email,'firstname':request.user.first_name,'lastname':request.user.last_name})
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'An error occurred while fetching user profile'}, status=500)

@csrf_exempt
@login_required
def addcart(request):
    data = json.loads(request.body)
    product_name = data.get('productname')
    price = data.get('price')
    quantity = data.get('quantity')
    category = data.get('category')
    image_data = data.get('image')
    print(image_data)
    if image_data:
        format, imgstr = image_data.split(';base64,')
        ext = format.split('/')[-1]
        image_data = ContentFile(base64.b64decode(imgstr), name=f'{product_name}_image.{ext}')
    print(image_data)
    
    existing_item = Cart.objects.filter(username=request.user.username, productname=product_name).first()
    if existing_item:
        existing_item.quantity = int(quantity)
        if image_data:
            existing_item.productimage = image_data
        existing_item.save()
    else:
        cart = Cart(
            username=request.user.username,
            productname=product_name,
            price=price,
            quantity=quantity,
            category=category,
            productimage=image_data if image_data else None
        )
        cart.save()
    return JsonResponse({'message': 'Cart updated successfully'})

@csrf_exempt
@login_required
def viewcart(request):
    try:
        data = Cart.objects.filter(username=request.user.username)
        cart_data = list(data.values())
        return JsonResponse({'cart': cart_data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@login_required 
def delete_cart_item(request, product_name):
    cart_item = get_object_or_404(Cart, productname=product_name, username=request.user.username)
    cart_item.delete()
    return JsonResponse({'message': 'Cart item deleted successfully'})


def get_meals(request):
    search_term = request.GET.get('searchTerm', '')
    url = f'https://www.themealdb.com/api/json/v1/1/search.php?s={search_term}'
    try:
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def checkout(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        order = Order(
            username=data['username'],
            items=data['items'],
            amount=data['amount'],
            address=data['address'],
            status=data['status'],
            payment=False
        )
        order.save()
        print(order)
        return JsonResponse({
            'msg': "Order placed successfully",
            'order_id': order.id,
            'amount': order.amount
        })
    else:
        return JsonResponse({'msg': "Invalid request method"}, status=400)
    
@csrf_exempt
def update_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        order_id = data['order_id']
        payment = data['payment']
        try:
            order = Order.objects.get(id=order_id)
            order.payment = payment
            order.save()
            return JsonResponse({'msg': "Order updated successfully"})
        except Order.DoesNotExist:
            return JsonResponse({'msg': "Order not found"}, status=404)
    else:
        return JsonResponse({'msg': "Invalid request method"}, status=400)
    
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        amount = data['amount']

        try:
            intent = stripe.PaymentIntent.create(
                amount=amount * 100,
                currency='usd',
                payment_method_types=['card'],
            )
            return JsonResponse({
                'clientSecret': intent['client_secret']
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
