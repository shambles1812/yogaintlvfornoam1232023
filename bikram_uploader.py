import psycopg2
import csv
conn = psycopg2.connect(database="dd5cpq7v9qs722",
                        user='bmobccrndlluhc', password='8f4ea7da8b4e2a615150eaf4f2cadfc32a0ed3ad51212202646d7c771bb92155', 
                        host='ec2-52-201-124-168.compute-1.amazonaws.com', port='5432'
)
  
conn.autocommit = True
cursor = conn.cursor()
  
  
# sql = ''''''
  
  
# cursor.execute(sql)

  
# conn.commit()
# conn.close()
# with open("bikram.csv","r",encoding="cp862") as f:
#     print(f.readline())


with open('bikram.csv', 'r',encoding="cp862") as csv_file:
    csv_reader = csv.reader(csv_file)

    for line in csv_reader:
        if "studio_logo" not in line:
            print("sending line")
            print(line)
            sql = f"INSERT INTO yoga_yoga (studio_logo,class_date,class_name,class_start_hour,class_end_hour,class_teacher,studio_address,phone_number,url) VALUES ( '{str(line[0])}', '{line[1]}', '{line[2].encode('UTF-8')}', '{line[3]}', '{line[4]}', '{line[5]}', '{line[6]}', '{line[7]}', '{line[8]}') ON CONFLICT (id) DO NOTHING"
            cursor.execute(sql)
            conn.commit()
            
    conn.close()
   