import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text(
            'List of Patients',
          ),
        ),
        body: FutureBuilder<List<Map<String, dynamic>>>(
          future: fetchPatientData(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else if (snapshot.hasError) {
              return Center(
                child: Text('Error fetching data: ${snapshot.error}'),
              );
            } else {
              return MyListView(patients: snapshot.data!);
            }
          },
        ),
      ),
    );
  }

  Future<List<Map<String, dynamic>>> fetchPatientData() async {
    try {
      final response = await http
          .get(
            Uri.parse('http://192.168.172.119:8080/admin'),
            // Specify a timeout duration of 30 seconds
          )
          .timeout(const Duration(seconds: 30));
      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        return List<Map<String, dynamic>>.from(data);
      } else {
        throw Exception(
            'Failed to load patient data: ${response.reasonPhrase}');
      }
    } catch (e) {
      throw Exception('Failed to fetch patient data: $e');
    }
  }
}

class MyListView extends StatefulWidget {
  final List<Map<String, dynamic>> patients;

  const MyListView({Key? key, required this.patients}) : super(key: key);

  @override
  _MyListViewState createState() => _MyListViewState();
}

class _MyListViewState extends State<MyListView> {
  late List<bool> itemChecked;

  @override
  void initState() {
    super.initState();
    itemChecked = List<bool>.filled(widget.patients.length, false);
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: widget.patients.length,
      itemBuilder: (context, index) {
        final patient = widget.patients[index];
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                'Patient ${index + 1}',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ListTile(
              title: Text('${patient['name']}'),
              subtitle: Text(
                  'Location: ${patient['location']}\nPhone: ${patient['phoneNumber']}'),
              trailing: Checkbox(
                value: itemChecked[index],
                onChanged: (bool? value) {
                  setState(() {
                    itemChecked[index] = value ?? false;
                  });
                },
              ),
            ),
            Divider(),
          ],
        );
      },
    );
  }
}
