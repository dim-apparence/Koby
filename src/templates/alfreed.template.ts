import { pascalCase, sentenceCase, snakeCase } from "change-case";

export class TemplateAlfreed {
  static generateModel(modelName: string) {
    const pascalCaseName = pascalCase(modelName);

    return `\
class ${pascalCaseName}ViewModel {
  ${pascalCaseName}ViewModel();
}
`;
  }

  static generatePage(pageName: string) {
    const pascalCaseName = pascalCase(pageName);
    const snakeCaseName = snakeCase(pageName);

    return `\
import 'package:alfreed/alfreed.dart';
import 'package:flutter/material.dart';

import '${snakeCaseName}_presenter.dart';
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}ViewInterface extends AlfreedView {
  ${pascalCaseName}ViewInterface(BuildContext context) : super(context: context);
}

class ${pascalCaseName}Page extends AlfreedPage<${pascalCaseName}Presenter, ${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface> {
  ${pascalCaseName}Page({Object? args}) : super(args: args);
  
  @override
  AlfreedPageBuilder<${pascalCaseName}Presenter, ${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface> get alfreedPageBuilder {
      return AlfreedPageBuilder<${pascalCaseName}Presenter, ${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface>(
      key: ValueKey('${pascalCaseName}Presenter'),
      presenterBuilder: (context) => ${pascalCaseName}Presenter(),
      interfaceBuilder: (context) => ${pascalCaseName}ViewInterface(context),
      builder: (context, presenter, model) {
        return Scaffold(
          key: ValueKey('${pascalCaseName}Page'),
          body: Text('${pascalCaseName}Page'),
        );
      },
    );
  }
}
`;
  }

  static generatePresenter(presenterName: string) {
    const pascalCaseName = pascalCase(presenterName);
    const snakeCaseName = snakeCase(presenterName);

    return `\
import 'package:alfreed/alfreed.dart';

import '${snakeCaseName}.dart';
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}Presenter extends Presenter<${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface> {
  ${pascalCaseName}Presenter() : super(state: ${pascalCaseName}ViewModel());
  
  @override
  void onInit() {
    super.onInit();
  }
}
`;
  }

  static generateTest(pageName: string) {
    const pascalCaseName = pascalCase(pageName);
    const sentenceCaseName = sentenceCase(pageName);

    return `\
import 'package:alfreed/alfreed.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

void main() async {
  late ${pascalCaseName}Presenter presenter;

  // mock repositories here

  // load mocked file here

  group(
    '${sentenceCaseName}',
    () {
      void _resetMocks() {}

      Future _beforeEach(
        WidgetTester tester,
      ) async {
        await tester.pumpWidget(
          AppUtils.createWithInjectors(
            MaterialApp(
              routes: {'': (ctx) => ${pascalCaseName}Page()},
              initialRoute: '',
            ),
            mockedRepositories: { },
          ),
        );
        await tester.pumpAndSettle();

        presenter =
            (tester.widget(find.byKey(ValueKey('${pascalCaseName}PagePresenter')))
                    as PresenterInherited<${pascalCaseName}Presenter, ${pascalCaseName}Model>)
                .presenter;
      }
    },
  );
}
`;
  }
}
