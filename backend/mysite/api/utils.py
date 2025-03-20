# utils.py (crea este archivo)
from django.shortcuts import redirect

# Aún no funciona esto :c


def login_required(view_func):
    def wrapper(request, *args, **kwargs):
        if 'usuario_id' not in request.session:
            return redirect('login')
        return view_func(request, *args, **kwargs)
    return wrapper
