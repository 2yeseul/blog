---
title: 'Jdbc를 통한 Bulk Insert'
date: 2021-09-30 00:00:00
description: "JPA에서는 Bulk Insert를 지원하지 않기 때문에 Jdbc를 통해 진행되어야 한다."
tags: [Java, SpringBoot]
thumbnail: 
---  

# Jdbc를 통한 Bulk Insert

``` java 

@Repository
@RequiredArgsConstructor
public class someJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public int[] bulkInsert(List<SomeEntity> someEntities) {
        return this.jdbcTemplate.batchUpdate(
            "insert into some_table (some_value) values (?)",
            new BatchPreparedStatement() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    SomeEntity someEntity = someEntities.get(i);
                    ps.setLong(1, someEntity.getSomeValue(i));
                }

                @Override
                public int getBatchSize() {
                    return someEntities.size();
            });
    }
}
``` 