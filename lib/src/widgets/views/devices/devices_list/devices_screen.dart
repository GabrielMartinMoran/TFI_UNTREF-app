import 'package:app/src/configs/pallete.dart';
import 'package:app/src/models/device.dart';
import 'package:app/src/providers/app_title_provider.dart';
import 'package:app/src/providers/devices_provider.dart';
import 'package:app/src/providers/router_provider.dart';
import 'package:app/src/services/devices_service.dart';
import 'package:app/src/widgets/views/devices/devices_list/device_list_item.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:provider/provider.dart';

class DevicesScreen extends StatefulWidget {
  DevicesScreen({Key? key}) : super(key: key);

  @override
  _DevicesScreenState createState() => _DevicesScreenState();
}

class _DevicesScreenState extends State<DevicesScreen> {
  late AppTitleProvider _appTitleProvider;

  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback(
        (_) => this._appTitleProvider.appTitle = 'Mis dispositivos');
  }

  @override
  Widget build(BuildContext context) {
    final routerProvider = Provider.of<RouterProvider>(context);
    final devicesProvider = Provider.of<DevicesProvider>(context);
    this._appTitleProvider = Provider.of<AppTitleProvider>(context);
    return Scaffold(
        backgroundColor: Pallete.background,
        body: ListView(
          children: _body(devicesProvider),
        ),
        floatingActionButton: FloatingActionButton(
            backgroundColor: Pallete.secondary,
            foregroundColor: Pallete.overSecondary,
            tooltip: 'Agregar dispositivo',
            onPressed: () => routerProvider.navigateTo('/devices/add'),
            child: Icon(MdiIcons.plus)));
  }

  List<Widget> _body(DevicesProvider devicesProvider) {
    final List<Widget> children = [SizedBox(height: 5.0)];
    children.addAll(getDevicesListItems(devicesProvider.devices));
    return children;
  }

  List<DeviceListItem> getDevicesListItems(List<Device> devices) {
    List<DeviceListItem> items = [];
    for (var device in devices) {
      items.add(DeviceListItem(device));
    }
    return items;
  }
}
