import 'package:app/src/providers/router_provider.dart';
import 'package:app/src/services/auth_service.dart';
import 'package:app/src/widgets/ui/button.dart';
import 'package:app/src/widgets/ui/floating_container.dart';
import 'package:app/src/widgets/ui/text_input.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoginForm extends StatefulWidget {
  LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final AuthService _authService = new AuthService();
  final TextEditingController _emailTextController = TextEditingController();
  final TextEditingController _passwordTextController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final routerProvider = Provider.of<RouterProvider>(context);
    return FloatingContainer(
      child: Column(children: [
        TextInput(
            placeholder: 'E-mail',
            validator: (value) {
              if (value == null || value.isEmpty)
                return 'El email no puede estar vacío';
              return null;
            },
            controller: _emailTextController),
        TextInput(
            placeholder: 'Contraseña',
            validator: (value) {
              if (value == null || value.isEmpty)
                return 'La constraseña no puede estar vacío';
              return null;
            },
            controller: _passwordTextController,
            hideContent: true),
        SizedBox(height: 20.0),
        Button(
          text: 'Iniciar sesión',
          onPressed: () {
            print(
                'Clickeado el login -> ${_emailTextController.text} | ${_passwordTextController.text}');

            this
                ._authService
                .login(_emailTextController.text, _passwordTextController.text)
                .then((token) {
              print('Token obtained: ${this._authService.token}');
              routerProvider.navigateTo('/');
            });
          },
        )
      ]),
    );
  }
}
