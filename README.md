# SQLNow

ASP.NET web dashboard (dhtmlx front end) reading directly from the **dtcSN** database — the
T-SQL reporting layer built by [OperationsManager](https://github.com/JankeUwe/OperationsManager)
over Microsoft SCOM's `OperationsManagerDW`. Together they form a customer-aware inventory of
every SQL Server, computer, and database SCOM already monitors.

## Views

| View | Shows |
| --- | --- |
| SQL Server | The SQL Server inventory itself, one row per instance |
| Server | The underlying computer/machine inventory |
| Databases | Every database across the estate, with its type and exclusion status |
| Customers | Customer and domain assignment for every tracked server |
| Master data | Reference data: SQL versions, database types, support types, and the exclude list |
| Distribution | Charts breaking the estate down by SQL version, edition, and customer |
| Alerts & maintenance | The imported SCOM alert and maintenance history, browsable per server |

## Requirements

- Microsoft SCOM with `OperationsManagerDW` deployed and collecting SQL Server management pack data
- The `dtcSN` reporting database (see [OperationsManager](https://github.com/JankeUwe/OperationsManager))
- IIS + ASP.NET

SQLNow doesn't currently ship a separate license file in this repository — check with the vendor
before redistributing it.

## More information

Full write-up, screenshots, and setup details: [powershelldba.de/operationsmanager](https://www.powershelldba.de/operationsmanager/#dashboard)

Developed by [dtcSoftware](https://www.powershelldba.de) (Uwe Janke), Senior SQL Server DBA.
