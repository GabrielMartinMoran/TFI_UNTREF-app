import 'package:app/src/providers/app_title_provider.dart';
import 'package:app/src/widgets/ui/header.dart';
import 'package:app/src/widgets/views/login/login_form.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  late AppTitleProvider _appTitleProvider;

  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback(
        (_) => this._appTitleProvider.appTitle = 'Iniciar sesión');
  }

  @override
  Widget build(BuildContext context) {
    this._appTitleProvider = Provider.of<AppTitleProvider>(context);
    return Column(
      children: [Header("Login"), LoginForm()],
    );
  }
}
